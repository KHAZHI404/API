import {Response, Request} from 'express'
import {SETTINGS} from "../settings";
import {blogsRepository} from "../repositories/blogs-repository";


export const getBlogsController = (req: Request, res: Response) => {
    const foundBlogs = blogsRepository.findBlogs(req.query.name?.toString())
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundBlogs) // отдаём видео в качестве ответа
}

export const postBlogController = (req: Request, res: Response) => {
    const newBlog = blogsRepository.createBlog(req.body)
    res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newBlog);
};

export const findBlogController = (req: Request, res: Response) => {
    const foundBlog = blogsRepository.findBlogById(req.params.blogId)
    if (!foundBlog) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundBlog)
}

export const updateBlogController = (req: Request, res: Response) => {
    const isUpdated = blogsRepository.updateBlog(req.params.blogId, req.body)
    if (isUpdated) {
        const blog = blogsRepository.findBlogById(req.params.blogId)
        res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(blog)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deleteBlogController = (req: Request, res: Response) => {
    const isDeleted = blogsRepository.deleteBlog(req.params.blogId)
    if (isDeleted) {
        res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}
