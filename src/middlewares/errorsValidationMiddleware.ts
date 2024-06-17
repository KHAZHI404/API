import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {SETTINGS} from "../settings";
import {FieldError, OutputErrorsType} from "../input-output-types/output-errors-type";

export const errorsValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();

    if (errors.length) {
        const firstError: any = errors[0]

        const outputErrors: OutputErrorsType = {
            errorsMessages: [{
                message: firstError.msg,
                field: firstError.path
            }]
        }
        res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).json(outputErrors)
        return
    }
    next()
}