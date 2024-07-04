import {Router} from "express";
import {
    createPostsForBlogController,
    deleteBlogController,
    findBlogController, foundPostsForBlogController,
    getBlogsController,
    postBlogController,
    updateBlogController
} from "../controllers/blogs-controller";
import {blogValidation} from "../validators/blog-input-validation";
import {errorsValidationMiddleware} from "../middlewares/errors-validation-middleware";
import {postValidation} from "../validators/post-input-validation";
import {basicAuth} from "../middlewares/auth-middleware";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsController);

blogsRouter.post('/', basicAuth, blogValidation, errorsValidationMiddleware, postBlogController);

blogsRouter.get('/:blogId/posts', foundPostsForBlogController);

blogsRouter.post('/:blogId/posts', basicAuth, postValidation, errorsValidationMiddleware, createPostsForBlogController);

blogsRouter.get('/:blogId', findBlogController);

blogsRouter.put('/:blogId', basicAuth, blogValidation, errorsValidationMiddleware, updateBlogController);

blogsRouter.delete('/:blogId', basicAuth, deleteBlogController);
