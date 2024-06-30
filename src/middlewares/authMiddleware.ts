import {NextFunction, Request, Response} from "express";
import {SETTINGS} from "../settings";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string

    if (!auth || auth.slice(0, 6) !== 'Basic ') {
        res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401)
        return;
    }

    const buff = Buffer.from(auth.slice(6), 'base64');
    const decodedAuth = buff.toString('utf8');

    const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8');
    const codedAuth = buff2.toString('base64');

    if (decodedAuth !== SETTINGS.ADMIN_AUTH) {
        res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401);
        return;
    }

    next();
};
