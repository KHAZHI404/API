import {ObjectId} from "mongodb";

export type UserDBModel = {
    _id: ObjectId
    accountData: accountDataModel,
    emailConfirmation: emailConfirmationModel,
}

export type accountDataModel = {
    userName: string
    email: string,
    passwordHash: string
    createdAt: string
}

export type emailConfirmationModel = {
    confirmationCode: string
    expirationDate: Date
    isConfirmed: boolean
    // sentEmails: sentEmailsModel[]
}

export type emailDataModel = {
    email: string
    subject: string
    message: string
}

export type sentEmailsModel = {
    sentDate: string
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
        login: user.accountData.userName,
        email: user.accountData.email,
        createdAt: user.accountData.createdAt,
    }
}