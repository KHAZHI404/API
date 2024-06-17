import {Router} from "express";
import {
    deleteBlogController,
    findBlogController,
    getBlogsController,
    postBlogController,
    updateBlogController
} from "../controllers/blogs-controller";
import {blogValidation} from "../middlewares/blogInputValidation";
import {errorsValidationMiddleware} from "../middlewares/errorsValidationMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";


export const blogsRouter = Router({})


blogsRouter.get('/', getBlogsController);

blogsRouter.post('/',
    authMiddleware,
    blogValidation,
    errorsValidationMiddleware, postBlogController);

blogsRouter.get('/:blogId', findBlogController);

blogsRouter.put('/:blogId',
    authMiddleware,
    blogValidation,
    errorsValidationMiddleware, updateBlogController);

blogsRouter.delete('/:blogId',
    authMiddleware, deleteBlogController);
