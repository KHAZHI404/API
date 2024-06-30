import {Router} from "express";
import {usersService} from "../domain/users-service";
import {SETTINGS} from "../settings";


export const authRouter = Router({})

authRouter.post('/login', async (req, res) => {
    const checkResult: Promise<Boolean> = await usersService.checkCredentials(req.body.loginOrEmal);
    if (!checkResult) return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401)
    return res.sendStatus(SETTINGS.HTTP_STATUSES.OK_200)

})