import {commentsDbRepository} from "../repositories/comments-db-repository";
import {CommentDBModel} from "../types/comment-types";
import {ObjectId} from "mongodb";


export const commentsService = {

    async createCommentForPost(userData: {userId: string, userLogin: string}, postId: string, content: string) {

        const newComment: CommentDBModel = {
            _id: new ObjectId(),
            // postId: postId,
            content: content,
            commentatorInfo: {
                userId: userData.userId,
                userLogin: userData.userLogin
            },
            createdAt: new Date().toISOString()
        }
        return await commentsDbRepository.createCommentForPost(newComment);
    },

    async updateComment(commentId: string, content: string) {
        return await commentsDbRepository.updateComment(commentId, content);
    },


    async deleteComment(commentId: string) {
        return await commentsDbRepository.deleteComment(commentId)
    }
}