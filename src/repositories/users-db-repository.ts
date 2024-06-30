import {ObjectId} from "mongodb";
import {userCollection} from "../db/mongodb";
import {userMapper, UserViewModel} from "../input-output-types/user-types";


export const usersDbRepository = {

    async createUser(newUser: any) {
        return await userCollection.insertOne(newUser)
    },


    async deleteUser(userId: string) {
        const result = await userCollection.deleteOne({_id: new ObjectId(userId)})
        return result.deletedCount === 1
    },

}