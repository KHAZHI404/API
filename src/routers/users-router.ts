import {Router} from "express";
import {deleteUserController, getUsersController, postUserController} from "../controllers/users-controller";
import {userValidation} from "../middlewares/userInputValidation";
import {errorsValidationMiddleware} from "../middlewares/errorsValidationMiddleware";
import {basicAuth} from "../middlewares/authMiddleware";

export const usersRouter = Router();

usersRouter.get('/', basicAuth, getUsersController)

usersRouter.post('/', basicAuth, userValidation, errorsValidationMiddleware, postUserController)

usersRouter.delete('/:userId', basicAuth, deleteUserController)