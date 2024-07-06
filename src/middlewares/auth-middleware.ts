import {NextFunction, Request, Response} from "express";
import {SETTINGS} from "../settings";
import {jwtService} from "../application/jwt-service";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
import {ObjectId} from "mongodb";
import {UserViewModel} from "../types/user-types";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string

    if (!auth || auth.slice(0, 6) !== 'Basic ') {
        res.status(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401).send('first error')
        return;
    }

    const buff = Buffer.from(auth.slice(6), 'base64');
    const decodedAuth = buff.toString('utf8');

    const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8');
    const codedAuth = buff2.toString('base64');

    if (decodedAuth !== SETTINGS.ADMIN_AUTH) {
        res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401).send('second error');
        return;
    }
    next();
};

export const bearerAuth = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization']
    if (!auth) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401)
    }

    const token = auth.split(' ')[1];

    const userId = await jwtService.getUserIdByToken(token)
    if (!userId) return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)

    if(!ObjectId.isValid(userId)) return res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");

    const user: UserViewModel | null = await usersQueryRepository.findUserById(userId.toString())
    if (user) {
        req.user = user
        return next()
    }
    res.send(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401)
}