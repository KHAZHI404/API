import {body} from "express-validator";

export const commentValidation = [
    body('content')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 20, max: 300})
        .escape()
]
