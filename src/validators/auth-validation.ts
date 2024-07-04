import {body} from "express-validator";

export const authValidation = [
    body('loginOrEmail')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('errors in loginOrEmail'),
    body('password')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('errors in password'),
]