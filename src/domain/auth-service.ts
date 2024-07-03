import {LoginInputModel, UserDBModel} from "../types/user-types";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
const bcrypt = require('bcrypt');


export const authService = {

    async checkCredentials(body: LoginInputModel): Promise<UserDBModel | null> {
        const user: UserDBModel | null = await usersQueryRepository.findByLoginOrEmail(body.loginOrEmail)
        if (!user) return null

        const isMatch = await bcrypt.compare(body.password, user.passwordHash)

        if (isMatch) return user
        return null
    },


}