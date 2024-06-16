import {body} from "express-validator";

export const videoValidation = [
    body('title').trim().notEmpty().withMessage('title is required'),
    body('author').trim().notEmpty().withMessage('author is required')
]
