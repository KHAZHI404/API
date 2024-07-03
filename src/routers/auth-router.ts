import {Router} from "express";
import {validateAuthorization} from "../middlewares/validate-authorization";
import {errorsValidationMiddleware} from "../middlewares/errorsValidationMiddleware";
import {authLoginController, authMeController} from "../controllers/auth-controller";
import {bearerAuth} from "../middlewares/authMiddleware";


export const authRouter = Router({})

authRouter.post('/login', validateAuthorization, errorsValidationMiddleware, authLoginController)

authRouter.get('/me', bearerAuth, authMeController)