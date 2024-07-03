import {SETTINGS} from "../settings";
import {ObjectId} from "mongodb";
import jwt from 'jsonwebtoken';


export const jwtService = {

    async createToken(userId: string, expiresIn: string) {
        return jwt.sign({userId: userId}, SETTINGS.JWT_SECRET, {expiresIn});
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, SETTINGS.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        }
    },

}