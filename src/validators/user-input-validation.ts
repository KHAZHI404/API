import {body} from "express-validator";
const patternLogin = /^[a-zA-Z0-9_-]*$/
const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const registrationValidation = [
    body('login')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 10})
        .matches(patternLogin),
    body('password')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 6, max: 20})
        .escape(),
    body('email')
        .isString()
        .trim()
        .notEmpty()
        .matches(patternEmail)
]
