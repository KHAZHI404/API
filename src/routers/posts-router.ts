import {Router} from "express"
import {errorsValidationMiddleware} from "../middlewares/errorsValidationMiddleware"
import {
    deletePostController,
    findPostController,
    getPostsController,
    postPostController,
    updatePostController
} from "../controllers/posts-controller"
import {postValidation} from "../middlewares/postsInputValidation";
import {basicAuth} from "../middlewares/authMiddleware";


export const postsRouter = Router({})


postsRouter.get('/', getPostsController);

postsRouter.post('/', basicAuth, postValidation, errorsValidationMiddleware, postPostController);

postsRouter.get('/:postId', findPostController);

postsRouter.put('/:postId', basicAuth, postValidation, errorsValidationMiddleware, updatePostController);

postsRouter.delete('/:postId', basicAuth, deletePostController);
