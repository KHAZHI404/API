import {Response, Request} from 'express'
import {SETTINGS} from "../settings";
import {BlogDBModel, BlogViewModel} from "../input-output-types/blog-types";
import {ObjectId} from "mongodb";
import {blogsService} from "../domain/blogs-service";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";
import {getPageOptions} from "../input-output-types/output-errors-type";
import {postsQueryRepository} from "../query-repositories/posts-query-repository";


export const getBlogsController = async (req: Request, res: Response) => {
    const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = getPageOptions(req.query);


    const foundBlogs = await blogsQueryRepository.findBlogs(pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm)
    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundBlogs)
}

export const postBlogController = async (req: Request, res: Response) => {
    const newBlog: BlogDBModel = await blogsService.createBlog(req.body)
    return res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newBlog);
}

export const foundPostsForBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const blog = await blogsQueryRepository.findBlogById(blogId)
    if (blog) {
        const postsForBlog = await postsQueryRepository.findPostsForBlog(blogId)
        return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(postsForBlog)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)

    }

export const findBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const foundBlog: BlogViewModel | null = await blogsQueryRepository.findBlogById(blogId)

    if (!foundBlog) return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundBlog)
}

export const updateBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const isUpdated: boolean = await blogsService.updateBlog(blogId, req.body)
    if (isUpdated) {
        const blog: BlogViewModel | null = await blogsQueryRepository.findBlogById(blogId)
        return res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(blog)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deleteBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const isDeleted: boolean = await blogsService.deleteBlog(blogId)
    if (isDeleted) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}
