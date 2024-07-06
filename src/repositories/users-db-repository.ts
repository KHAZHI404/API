import {ObjectId} from "mongodb";
import {userCollection} from "../db/mongodb";
import {UserDBModel} from "../types/user-types";


export const usersDbRepository = {

    async createUser(newUser: any) {
        return await userCollection.insertOne(newUser)
    },

    async createUserAccount(newUser: UserDBModel) {
        await userCollection.insertOne(newUser)
        return newUser
    },

    async deleteUser(userId: string) {
        const result = await userCollection.deleteOne({_id: new ObjectId(userId)} )
        return result.deletedCount === 1
    },

    async updateConfirmation(_id: ObjectId) {
        const result = await userCollection
            .updateOne({_id}, {$set: {'emailConfirmation.isConfirmed': true} } )
        return result.modifiedCount === 1
    },

}