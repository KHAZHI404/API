import {LoginInputModel, UserDBModel, UserInputModel, UserViewModel} from "../input-output-types/user-types";
import {usersDbRepository} from "../repositories/users-db-repository";
import {ObjectId} from "mongodb";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
const  bcrypt  =  require ( 'bcrypt' ) ;


export const usersService = {

    async createUser(inputData: UserInputModel) {
        // Проверка на уникальность login
        const existingUserByLogin = await usersQueryRepository.findByLoginOrEmail(inputData.login);
        if (existingUserByLogin) {
            return {
                errorsMessages: [{ field: 'login', message: 'login should be unique' }] // какой код он должен возвращать?
            };
        }

        // Проверка на уникальность email
        const existingUserByEmail = await usersQueryRepository.findByLoginOrEmail(inputData.email);
        if (existingUserByEmail) {
            return {
                errorsMessages: [{ field: 'email', message: 'email should be unique' }]
            };
        }
        const passwordHash = await bcrypt.hash(inputData.password, 10)

        const newUser: UserDBModel = {
            _id: new ObjectId(),
            userName: inputData.login,
            email: inputData.email,
            passwordHash,
            createdAt: new Date().toISOString(),
}


        await usersDbRepository.createUser(newUser)
        return await usersQueryRepository.findUserById(newUser._id.toString())
    },

    async deleteUser(userId: string) {
        return usersDbRepository.deleteUser(userId)
    },

    async checkCredentials(inputData: LoginInputModel) {
        const user: UserDBModel | null = await usersQueryRepository.findByLoginOrEmail(inputData.loginOrEmail)
        if (!user) return false

        return await bcrypt.compare(inputData.password, user.passwordHash)
    }


}