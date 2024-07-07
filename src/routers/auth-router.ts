import {Router} from "express";
import {confirmValidation, emailValidation, loginInputValidation} from "../validators/auth-validation";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";
import {
    authRegistrationValidation,
    emailResendingValidation,
    registrationValidation
} from "../validators/user-input-validation";

import {
    authLoginController,
    authMeController,
    registrationConfirmationController,
    registrationController,
    registrationEmailResendingController,
} from "../controllers/auth-controller";
import {bearerAuth} from "../middlewares/auth-middleware";


export const authRouter = Router({})

authRouter.post('/login', loginInputValidation, errorsValidationMiddleware, authLoginController)

authRouter.post('/registration-confirmation', confirmValidation, registrationConfirmationController)

authRouter.post('/registration', authRegistrationValidation , registrationController)

authRouter.post('/registration-email-resending', emailResendingValidation, registrationEmailResendingController)

authRouter.get('/me', bearerAuth, authMeController)
