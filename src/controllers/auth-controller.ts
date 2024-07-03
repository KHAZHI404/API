import {SETTINGS} from "../settings";
import {jwtService} from "../application/jwt-service";
import {Request, Response} from "express";
import {authService} from "../domain/auth-service";
import {UserDBModel} from "../types/user-types";
import {usersQueryRepository} from "../query-repositories/users-query-repository";

export const authLoginController = async (req: Request, res: Response) => {
    const user: UserDBModel | null = await authService.checkCredentials(req.body);
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
    })

}