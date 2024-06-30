import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {deleteUserController, getUsersController, postUserController} from "../controllers/users-controller";
import {userValidation} from "../middlewares/userInputValidation";
import {errorsValidationMiddleware} from "../middlewares/errorsValidationMiddleware";

export const usersRouter = Router();

usersRouter.get('/', authMiddleware, getUsersController)

usersRouter.post('/', authMiddleware, userValidation, errorsValidationMiddleware, postUserController)

usersRouter.delete('/:userId', authMiddleware, deleteUserController)