import {Router} from "express";
import {confirmValidation, loginInputValidation} from "../validators/auth-validation";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";
import {registrationValidation} from "../validators/user-input-validation";

import {
    authLoginController,
    authMeController,
    registrationConfirmationController,
    registrationController,
    registrationEmailResendingController
} from "../controllers/auth-controller";
import {bearerAuth} from "../middlewares/auth-middleware";


export const authRouter = Router({})

authRouter.post('/login', loginInputValidation, errorsValidationMiddleware, authLoginController)

authRouter.post('/registration-confirmation', confirmValidation, errorsValidationMiddleware, registrationConfirmationController)

authRouter.post('/registration', registrationValidation,  errorsValidationMiddleware, registrationController)

authRouter.post('/registration-email-resending', registrationEmailResendingController)

authRouter.get('/me', bearerAuth, authMeController)
