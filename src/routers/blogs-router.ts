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
import {authMiddleware} from "../middlewares/authMiddleware";
import {postValidation} from "../middlewares/postsInputValidation";


export const blogsRouter = Router({})

//объединить блог валидацию и эррор валидацию

blogsRouter.get('/', getBlogsController);

blogsRouter.post('/', authMiddleware, blogValidation, errorsValidationMiddleware, postBlogController);

blogsRouter.get('/:blogId/posts', foundPostsForBlogController);

blogsRouter.post('/:blogId/posts', authMiddleware, postValidation, errorsValidationMiddleware, createPostsForBlogController);

blogsRouter.get('/:blogId', findBlogController);

blogsRouter.put('/:blogId', authMiddleware, blogValidation, errorsValidationMiddleware, updateBlogController);

blogsRouter.delete('/:blogId', authMiddleware, deleteBlogController);
