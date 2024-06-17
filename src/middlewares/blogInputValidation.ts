import {body} from "express-validator";
const pattern = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

export const blogValidation = [
    body('name')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 15})
        .escape(),
    body('description')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 500})
        .escape(),
    body('websiteUrl')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 100})
        .matches(pattern)
        // .escape()
]
