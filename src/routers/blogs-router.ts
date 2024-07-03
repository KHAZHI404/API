import {Router} from "express";
import {
    createPostsForBlogController,
    deleteBlogController,
    findBlogController, foundPostsForBlogController,
    getBlogsController,
    postBlogController,
    updateBlogController
} from "../controllers/blogs-controller";
import {blogValidation} from "../middlewares/blogInputValidation";
import {errorsValidationMiddleware} from "../middlewares/errorsValidationMiddleware";
import {postValidation} from "../middlewares/postsInputValidation";
import {basicAuth} from "../middlewares/authMiddleware";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsController);

blogsRouter.post('/', basicAuth, blogValidation, errorsValidationMiddleware, postBlogController);

blogsRouter.get('/:blogId/posts', foundPostsForBlogController);

blogsRouter.post('/:blogId/posts', basicAuth, postValidation, errorsValidationMiddleware, createPostsForBlogController);

blogsRouter.get('/:blogId', findBlogController);

blogsRouter.put('/:blogId', basicAuth, blogValidation, errorsValidationMiddleware, updateBlogController);

blogsRouter.delete('/:blogId', basicAuth, deleteBlogController);
