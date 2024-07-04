import {commentCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {CommentDBModel, commentMapper, CommentViewModel} from "../types/comment-types";


export const commentsQueriesRepository = {

    async findCommentById(commentId: string): Promise<CommentViewModel | null> {
        const commentInDB: CommentDBModel | null = await commentCollection.findOne({_id: new ObjectId(commentId)})

        if (commentInDB) {
            return commentMapper(commentInDB)
        }
        return null
    }



}