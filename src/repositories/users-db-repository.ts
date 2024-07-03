import {InsertOneResult, ObjectId} from "mongodb";
import {userCollection} from "../db/mongodb";
import {UserDBModel} from "../types/user-types";


export const usersDbRepository = {

    async createUser(newUser: UserDBModel) {
        return await userCollection.insertOne(newUser)
    },

    async deleteUser(userId: string) {
        const result = await userCollection.deleteOne({_id: new ObjectId(userId)})
        return result.deletedCount === 1
    },

}