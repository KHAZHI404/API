import {Router} from "express";
import {
    deleteCommentController,
    getCommentByIdController,
    updateCommentController
} from "../controllers/comments-controller";
import {bearerAuth} from "../middlewares/auth-middleware";
import {ownerMiddleware} from "../middlewares/owner-middleware";
import {commentValidation} from "../validators/comment-input-validation";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";

export const commentsRouter = Router({})


commentsRouter.put('/:commentId', bearerAuth, commentValidation, errorsValidationMiddleware,
    ownerMiddleware, updateCommentController)

commentsRouter.delete('/:commentId', bearerAuth, ownerMiddleware, deleteCommentController)

commentsRouter.get('/:commentId', getCommentByIdController)