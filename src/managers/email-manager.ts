import {emailAdapter} from "../adapters/email-adapter";
import {emailDataModel} from "../types/user-types";


export const emailManager = {

    async sendEmailConfirmationMessage(emailData: emailDataModel) {
        await emailAdapter.sendEmail(emailData.email, emailData.subject, emailData.message)
    }


}