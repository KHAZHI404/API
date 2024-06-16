import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const errorsValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const e = validationResult(req)
    const errors = e.array()

    if (errors.length) {

        res.status(400).json({
                errorsMessages: errors.map(error => {
                        return {
                            message: error.msg,
                            field: error.type
                        }
                    }
                )
            }
        )
    }

    next()
}

//как выводить ТОЛЬКО первую ошибку? onlyFirstError: true
