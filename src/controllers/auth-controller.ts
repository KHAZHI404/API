import { SETTINGS } from "../settings";
import { jwtService } from "../application/jwt-service";
import { Request, Response } from "express";
import { authService } from "../domain/auth-service";
import { UserDBModel } from "../types/user-types";
import { usersQueryRepository } from "../query-repositories/users-query-repository";

export const authLoginController = async (req: Request, res: Response) => {
    try {
        const user: UserDBModel | null = await authService.checkCredentials(req.body);
        if (!user) {
            return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_AUTHORIZED_401);
        }

        const token: string = await jwtService.createToken(user._id.toString(), '2h');
        return res.status(SETTINGS.HTTP_STATUSES.OK_200).send({ accessToken: token });
    } catch (error) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send(error);
    }
};

export const authMeController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const currentUser = await usersQueryRepository.findUserById(userId);
        if (!currentUser) {
            return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404);
        }

        return res.send({
            email: currentUser.email,
            login: currentUser.login,
            userId: currentUser.id,
        });
    } catch (error) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send(error);
    }
};

export const registrationController = async (req: Request, res: Response) => {
    try {
        const { login, email, password } = req.body;

        const result = await authService.createUserAccount({ login, email, password });

        if (!result) {
            return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send('Failed to create user account');
        }

        if (!result.isSuccessful) {
            return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send({ errorsMessages: result.errorsMessages });
        }

        return res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204);
    } catch (error) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send(error);
    }
};

export const registrationConfirmationController = async (req: Request, res: Response) => {
    try {
        const result = await authService.confirmEmail(req.body.code);
        if (result) {
            return res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
        }

        return res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400);
    } catch (error) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send(error);
    }
};

export const registrationEmailResendingController = async (req: Request, res: Response) => {
    try {
        const result = await authService.confirmEmail(req.body.code);
        const user = await usersQueryRepository.findUserByConfirmationCode(req.body.code);


        return res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(user?.emailConfirmation.confirmationCode);
    } catch (error) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send(error);
    }
};
