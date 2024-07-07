import {LoginInputModel, UserDBModel, UserInputModel} from "../types/user-types";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
import {ObjectId} from "mongodb";
import {usersDbRepository} from "../repositories/users-db-repository";
const bcrypt = require('bcrypt');
import {add} from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import {emailManager} from "../managers/email-manager";



export const authService = {

    async createUserAccount(inputData: UserInputModel) {
        // Проверка на уникальность login
        const existingUserByLogin = await usersQueryRepository.findByLoginOrEmail(inputData.login);
        if (existingUserByLogin) {
            return {
                isSuccessful: false,
                errorsMessages: [{ message: 'login should be unique', field: 'login'}]
            };
        }
        // Проверка на уникальность email
        const existingUserByEmail = await usersQueryRepository.findByLoginOrEmail(inputData.email);
        if (existingUserByEmail) {
            return {
                isSuccessful: false,
                errorsMessages: [{ message: 'email should be unique', field: 'email'}]
            };
        }

        const passwordHash = await bcrypt.hash(inputData.password, 10) //хешируем пароль

        const newUser: UserDBModel = {
            _id: new ObjectId(),
            accountData: {
                userName: inputData.login,
                email: inputData.email,
                passwordHash,
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                   hours: 1,
                   minutes: 1,
                }),
                isConfirmed: false
            }
        }

        const user: UserDBModel = await usersDbRepository.createUserAccount(newUser)

        const emailData = {
            email: inputData.email,
            subject: 'email confirmation',
            message:`<h1>Thanks for your registration</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/confirm-email?code=${user.emailConfirmation.confirmationCode}''>complete registration</a>
 </p>`}


        try {
            await emailManager.sendEmailConfirmationMessage(emailData) // отправка письма на емайл с кодом подтвреждения
        } catch (error) {
            console.error(error)
            await usersDbRepository.deleteUser(user._id.toString())
            return null
        }

        return {userId: user._id, isSuccessful: true}
},

    async confirmEmail(code: string) {
        const user: UserDBModel | null  = await usersQueryRepository.findUserByConfirmationCode(code)

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false

        return await usersDbRepository.updateConfirmation(user._id)
    },

    async checkCredentials(body: LoginInputModel): Promise<UserDBModel | null> {
        const user: UserDBModel | null = await usersQueryRepository.findByLoginOrEmail(body.loginOrEmail)

        if (!user) return null

        if (!user.emailConfirmation.isConfirmed) return null

        const isMatch = await bcrypt.compare(body.password, user.accountData.passwordHash)

        if (isMatch) return user
        return null
    },



}