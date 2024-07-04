import {Request, Response} from "express";
import {commentsQueriesRepository} from "../query-repositories/comments-query-repository";
import {CommentViewModel} from "../types/comment-types";
import {SETTINGS} from "../settings";
import {commentsService} from "../domain/comments-service";
import {ObjectId} from "mongodb";


export const updateCommentController = async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    if (!ObjectId.isValid(commentId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }

    const isUpdated = await commentsService.updateComment(commentId, req.body.content)
    if (isUpdated) return res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deleteCommentController = async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    if (!ObjectId.isValid(commentId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const isDeleted = await commentsService.deleteComment(commentId)
    if (isDeleted) return res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

    return res.status(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const getCommentByIdController = async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    if (!ObjectId.isValid(commentId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }

    const comment: CommentViewModel | null = await commentsQueriesRepository.findCommentById(commentId.toString())
    if (comment) {
        return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(comment)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}
