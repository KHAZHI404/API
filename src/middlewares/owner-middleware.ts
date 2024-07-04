import {NextFunction, Request, Response} from "express";
import {commentsQueriesRepository} from "../query-repositories/comments-query-repository";
import {SETTINGS} from "../settings";

export const ownerMiddleware = async (req: Request, res: Response, next: NextFunction)=> {

    const commentId = req.params.commentId
    const comment = await commentsQueriesRepository.findCommentById(commentId)

    if (!comment) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    }

    if (comment?.commentatorInfo.userId !== req.user?.id) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.FOR_BIDDEN_403)
    }

    if (comment?.commentatorInfo.userLogin !== req.user?.login) {

        return res.sendStatus(SETTINGS.HTTP_STATUSES.FOR_BIDDEN_403)
    }

    return next();
}