import {commentCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";

export const commentsDbRepository = {

    async updateComment(commentId: string, content: string) {
        const result = await commentCollection.updateOne({_id: new ObjectId(commentId)}, {
            $set: {
                content: content
            }
        })
        return result.matchedCount === 1
    },

    async deleteComment(commentId: string) {
        const result = await commentCollection.deleteOne({_id: new ObjectId(commentId)})
        return result.deletedCount === 1
    }



}