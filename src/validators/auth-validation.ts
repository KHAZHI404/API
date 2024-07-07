import {body} from "express-validator";

const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

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


export const emailValidation = [
    body('email')
        .isString()
        .trim()
        .notEmpty()
        .matches(patternEmail)
        .withMessage('errors in email'),
]
