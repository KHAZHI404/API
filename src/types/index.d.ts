import {UserViewModel} from "./user-types";

declare global {
    namespace Express {
        export interface Request {
            user: UserViewModel | null
            userId: string | null
        }
    }
}
