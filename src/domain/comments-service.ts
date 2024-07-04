import {commentsDbRepository} from "../repositories/comments-db-repository";


export const commentsService = {

    async updateComment(commentId: string, content: string) {
        return await commentsDbRepository.updateComment(commentId, content);
    },


    async deleteComment(commentId: string) {
        return await commentsDbRepository.deleteComment(commentId)
    }
}