import {Router} from "express";
import {deleteUserController, getUsersController, postUserController} from "../controllers/users-controller";
import {userValidation} from "../validators/user-input-validation";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";
import {basicAuth} from "../middlewares/auth-middleware";

export const usersRouter = Router();

usersRouter.get('/', basicAuth, getUsersController)

usersRouter.post('/', basicAuth, userValidation, errorsValidationMiddleware, postUserController)

usersRouter.delete('/:userId', basicAuth, deleteUserController)