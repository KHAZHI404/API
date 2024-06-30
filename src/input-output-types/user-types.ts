import {ObjectId} from "mongodb";


export type UserDBModel = {
    _id: ObjectId
    userName: string
    email: string
    passwordHash: string
    createdAt: string
}

export type UserInputModel = {
    login: string
    password: string
    email: string
}
export type LoginInputModel = {
    loginOrEmail: string
    password: string
}

export type UserViewModel = {
    id: string
    login: string
    email: string
    createdAt: string
}

export type Paginator<UserViewModel> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:	UserViewModel[]
}

export const userMapper = (user: UserDBModel): UserViewModel => {
    return {
        id: user._id.toString(),
        login: user.userName,
        email: user.email,
        createdAt: user.createdAt,
    }
}