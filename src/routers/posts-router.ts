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


export const postsRouter = Router({})


postsRouter.get('/', getPostsController);

postsRouter.post('/',
    postValidation,
    errorsValidationMiddleware, postPostController);

postsRouter.get('/:postId', findPostController);

postsRouter.put('/:postId',
    postValidation,
    errorsValidationMiddleware, updatePostController);

postsRouter.delete('/:postId', deletePostController);
