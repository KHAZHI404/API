import {body} from "express-validator";
import {UserDBModel} from "../types/user-types";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";
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

export const uniqueEmailValidator = body('email').custom(async (body) => {
    const userByEmail: UserDBModel | null = await usersQueryRepository.findByLoginOrEmail(body);
    if (userByEmail) {
        throw new Error('User already exists');
    }
    return true;
});

export const uniqueLoginValidator = body('login').custom(async (body) => {
    const userByLogin: UserDBModel | null = await usersQueryRepository.findByLoginOrEmail(body);
    if (userByLogin) {
        throw new Error('User already exists');
    }
    return true;
});

export const emailConfirmed = body('email').custom(async (body) => {
    const userByEmail: UserDBModel | null = await usersQueryRepository.findByLoginOrEmail(body);
    if (userByEmail?.emailConfirmation.isConfirmed) {
        throw new Error('Email confirmed');
    }
    return true;
});

export const emailExist = body('email').custom(async (body) => {
    const userByEmail: UserDBModel | null = await usersQueryRepository.findByLoginOrEmail(body);
    if (!userByEmail) {
        throw new Error('User doesnt exists');
    }
    return true;
});

export const loginValidation = body('login')
    .isString()
    .trim()
    .isLength({min: 3, max: 10})
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('incorrect regex')
    .withMessage('incorrect login');

export const emailValidation = body('email')
    .isString()
    .trim()
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage('incorrect email');

export const passwordValidation = body('password')
    .isString()
    .trim()
    .isLength({min: 6, max:20})
    .withMessage('incorrect password');

export const authRegistrationValidation = () => [uniqueEmailValidator, uniqueLoginValidator, loginValidation, emailValidation, passwordValidation, errorsValidationMiddleware];
export const emailResendingValidation = () => [emailExist, emailConfirmed, emailValidation, errorsValidationMiddleware];


export const alreadyConfirm = body('code').custom(async (code) => {
    const userByCode = await usersQueryRepository.findUserByConfirmationCode(code);
    if (userByCode?.emailConfirmation.isConfirmed) {
        throw new Error('Code already confirmed');
    }
    return true;
});

export const codeDoesntExist = body('code').custom(async (code) => {
    const userByCode = await usersQueryRepository.findUserByConfirmationCode(code);
    if (!userByCode) {
        throw new Error('Code doesnt exist');
    }
    return true;
});

export const codeValidation = body('code')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('errors in code');


export const confirmationValidation = () => [codeDoesntExist, alreadyConfirm, codeValidation, errorsValidationMiddleware];
