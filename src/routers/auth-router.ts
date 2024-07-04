import {Router} from "express";
import {authValidation} from "../validators/auth-validation";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";
import {authLoginController, authMeController} from "../controllers/auth-controller";
import {bearerAuth} from "../middlewares/auth-middleware";


export const authRouter = Router({})

authRouter.post('/login', authValidation, errorsValidationMiddleware, authLoginController)

authRouter.get('/me', bearerAuth, authMeController)