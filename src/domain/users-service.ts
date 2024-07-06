import {UserDBModel, UserInputModel} from "../types/user-types";
import {usersDbRepository} from "../repositories/users-db-repository";
import {ObjectId} from "mongodb";
import {usersQueryRepository} from "../query-repositories/users-query-repository";

const bcrypt = require('bcrypt');


export const usersService = {

    async createUser(inputData: UserInputModel) {
        // Проверка на уникальность login
        const existingUserByLogin = await usersQueryRepository.findByLoginOrEmail(inputData.login);
        if (existingUserByLogin) {
            return {
                isSuccessful: false,
                errorsMessages: [{field: 'login', message: 'login should be unique'}]
            };
        }
        // Проверка на уникальность email
        const existingUserByEmail = await usersQueryRepository.findByLoginOrEmail(inputData.email);
        if (existingUserByEmail) {
            return {
                isSuccessful: false,
                errorsMessages: [{field: 'email', message: 'email should be unique'}]
            };
        }

        const passwordHash = await bcrypt.hash(inputData.password, 10) //хешируем пароль

        const newUser = {
            _id: new ObjectId(),
            userName: inputData.login,
            email: inputData.email,
            passwordHash,
            createdAt: new Date().toISOString(),
        }

        const user = await usersDbRepository.createUser(newUser)
        return {userId: user.insertedId, isSuccessful: true}
    },

    async deleteUser(userId: string) {
        return usersDbRepository.deleteUser(userId)
    },


}