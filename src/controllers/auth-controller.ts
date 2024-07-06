import {SETTINGS} from "../settings";
import {jwtService} from "../application/jwt-service";
import {Request, Response} from "express";
import {authService} from "../domain/auth-service";
import {UserDBModel} from "../types/user-types";
import {usersQueryRepository} from "../query-repositories/users-query-repository";

export const authLoginController = async (req: Request, res: Response) => {
    const user: UserDBModel | null = await authService.checkCredentials(req.body)
    if (!user) return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401)

    const token: string = await jwtService.createToken(user._id.toString(), '2h')

    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send({accessToken: token})
}

export const authMeController = async (req: Request, res: Response) => {
    const userId = req.user!.id
    const currentUser = await usersQueryRepository.findUserById(userId)
    if (!currentUser) return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)

    return res.send({
        email: currentUser.email,
        login: currentUser.login,
        userId: currentUser.id
    })}

    export const registrationController = async (req: Request, res: Response) => {
        const {login, email, password} = req.body
        const result = await authService.createUserAccount({login, email, password})

        if (!result) return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        if (!result.isSuccessful) {
            return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send(result.errorsMessages);
        }

        if (result) {
            res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
        }
        return res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)
    }

        export const registrationConfirmationController = async (req: Request, res: Response) => {
        const result = await authService.confirmEmail(req.body.code)//req.body.ip
            if (result) {
                res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send('your email confirmed')
            }
            res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)
    }

    export const registrationEmailResendingController = async (req: Request, res: Response) => {
        const result = await authService.confirmEmail(req.body.code)
            if (result) {
                res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send('your email confirmed')
            }
            res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)
    }