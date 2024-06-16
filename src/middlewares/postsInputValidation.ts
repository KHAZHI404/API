import {body} from "express-validator";

export const postValidation = [
    body('title')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 30})
        .withMessage('error in title')
        .escape(),
    body('shortDescription')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 100})
        .withMessage('error in shortDescription')
        .escape(),
    body('content')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 3, max: 1000})
        .withMessage('error in content')
        .escape(),
    body('blogId')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('error in blogId')
        .escape()

    ]
