import {Response, Request} from 'express'
import {SETTINGS} from "../settings";
import {BlogViewModel, Paginator} from "../types/blog-types";
import {ObjectId} from "mongodb";
import {blogsService} from "../domain/blogs-service";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";
import {postsQueryRepository} from "../query-repositories/posts-query-repository";
import {postsService} from "../domain/posts-service";
import {CommonQueryModel, getPageOptions} from "../types/pagination-sorting";
import {PostViewModel} from "../types/post-types";


export const getBlogsController = async (req: Request<{}, {}, {}, CommonQueryModel>, res: Response) => {
    const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = getPageOptions(req.query);

    const foundBlogs: Paginator<BlogViewModel> = await blogsQueryRepository.findBlogs(
        pageNumber, pageSize, sortBy, sortDirection, searchNameTerm)

    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundBlogs)
}

export const postBlogController = async (req: Request, res: Response) => {
    const blogId: ObjectId = await blogsService.createBlog(req.body)
    const blog: BlogViewModel | null = await blogsQueryRepository.findBlogById(blogId.toString())
    return res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(blog);
}

export const foundPostsForBlogController = async (req: Request<{
    blogId: string
}, {}, {}, CommonQueryModel>, res: Response) => {
    const blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }

    const blog: BlogViewModel | null = await blogsQueryRepository.findBlogById(blogId);

    if (blog) {
        const {pageNumber, pageSize, sortBy, sortDirection} = getPageOptions(req.query);

        const postsForBlog: Paginator<PostViewModel> = await postsQueryRepository.findPostsForBlog(
            blogId, pageNumber, pageSize, sortBy, sortDirection
        );

        return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(postsForBlog);
    }

    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404);
};

export const createPostsForBlogController = async (req: Request, res: Response) => {
    const postId = await postsService.createPost(req.body)
    if (!postId) return res.sendStatus(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)
    const post: PostViewModel | null = await postsQueryRepository.findPostById(postId.toString())
    return res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(post);


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
