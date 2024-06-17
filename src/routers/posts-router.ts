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
import {authMiddleware} from "../middlewares/authMiddleware";


export const postsRouter = Router({})


postsRouter.get('/', getPostsController);

postsRouter.post('/',
    authMiddleware,
    postValidation,
    errorsValidationMiddleware, postPostController);

postsRouter.get('/:postId', findPostController);

postsRouter.put('/:postId',
    authMiddleware,
    postValidation,
    errorsValidationMiddleware, updatePostController);

postsRouter.delete('/:postId',
    authMiddleware, deletePostController);
