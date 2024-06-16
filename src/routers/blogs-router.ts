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


export const blogsRouter = Router({})


blogsRouter.get('/', getBlogsController);

blogsRouter.post('/',
    blogValidation,
    errorsValidationMiddleware, postBlogController);

blogsRouter.get('/:blogId', findBlogController);

blogsRouter.put('/:blogId',
    blogValidation,
    errorsValidationMiddleware, updateBlogController);

blogsRouter.delete('/:blogId', deleteBlogController);
