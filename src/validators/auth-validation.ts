import {body} from "express-validator";

export const loginInputValidation = [
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

export const confirmValidation = [
    body('code')
        .isString()
        .trim()
        .notEmpty()
]