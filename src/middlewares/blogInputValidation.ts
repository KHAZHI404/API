import {body} from "express-validator";
const pattern = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

export const blogValidation = [
    body('name')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 15})
        .withMessage('error in name')
        .escape(),
    body('description')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 500})
        .withMessage('error in description')
        .escape(),
    body('websiteUrl')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 100})
        .matches(pattern)
        .withMessage('error in url')
        .escape()
]
