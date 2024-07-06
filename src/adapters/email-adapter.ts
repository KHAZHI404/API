import nodemailer from "nodemailer";
import {SETTINGS} from "../settings";

export const emailAdapter =  {

    async sendEmail(email: string, title: string, message: string) {
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: "skhazhi@internet.ru",
                pass: SETTINGS.MAIL_RU_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '"Haji" <skhazhi@internet.ru>', // sender address
            to: email, // list of receivers
            subject: title, // Subject line
            html: message, // html body
        });
    }

}