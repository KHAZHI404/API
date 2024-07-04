import {Router} from "express"
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware"
import {
    deletePostController,
    findPostController,
    getPostsController,
    postPostController,
    updatePostController
} from "../controllers/posts-controller"
import {postValidation} from "../validators/post-input-validation";
import {basicAuth} from "../middlewares/auth-middleware";


export const postsRouter = Router({})


postsRouter.get('/', getPostsController);

postsRouter.post('/', basicAuth, postValidation, errorsValidationMiddleware, postPostController);

postsRouter.get('/:postId', findPostController);

postsRouter.put('/:postId', basicAuth, postValidation, errorsValidationMiddleware, updatePostController);

postsRouter.delete('/:postId', basicAuth, deletePostController);
