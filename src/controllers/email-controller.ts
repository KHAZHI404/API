import {Request, Response} from "express";
import {emailAdapter} from "../adapters/email-adapter";
import {SETTINGS} from "../settings";


export const emailController = async (req: Request, res: Response) => {

    await emailAdapter.sendEmail(req.body.email, req.body.subject, req.body.message)

    res.status(SETTINGS.HTTP_STATUSES.OK_200).send({
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })
}