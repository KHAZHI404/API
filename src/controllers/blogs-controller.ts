import {Response, Request} from 'express'
import {SETTINGS} from "../settings";
import {BlogDBType} from "../input-output-types/blog-types";
import {blogsMongoRepository} from "../repositories/blogs-mongo-repository";
import {ObjectId} from "mongodb";


export const getBlogsController = async (req: Request, res: Response) => {
    const foundBlogs: BlogDBType[] = await blogsMongoRepository.findBlogs(req.query.name?.toString())
    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundBlogs) // отдаём видео в качестве ответа
}

export const postBlogController = async (req: Request, res: Response) => {
    const newBlog: BlogDBType = await blogsMongoRepository.createBlog(req.body)
    return res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newBlog);
}

export const findBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const foundBlog: BlogDBType | null = await blogsMongoRepository.findBlogById(blogId)
    if (!foundBlog) return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundBlog)
}

export const updateBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const isUpdated: boolean = await blogsMongoRepository.updateBlog(blogId, req.body)
    if (isUpdated) {
        const blog: BlogDBType | null = await blogsMongoRepository.findBlogById(blogId)
        return res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(blog)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deleteBlogController = async (req: Request, res: Response) => {
    const blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const isDeleted: boolean = await blogsMongoRepository.deleteBlog(blogId)
    if (isDeleted) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}
