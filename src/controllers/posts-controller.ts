import {Response, Request} from 'express'
import {SETTINGS} from "../settings"
import {PostDBType} from "../input-output-types/post-types";
import {ObjectId} from "mongodb";
import {postsService} from "../domain/posts-service";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";
import {postsQueryRepository} from "../query-repositories/posts-query-repository";


export const getPostsController = async (req: Request, res: Response) => {
    const foundPosts: PostDBType[] = await postsQueryRepository.findPosts(req.query.name?.toString())
    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundPosts)
}

export const postPostController = async (req: Request, res: Response) => {
    const blog = await blogsQueryRepository.findBlogById(req.body.blogId)
    if (!blog) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Blog not exist");
    }
    const newPost: PostDBType = await postsService.createPost(req.body, blog.name)
    return res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newPost);
}

export const findPostController = async (req: Request, res: Response) => {
    const postId = req.params.postId;
    if (!ObjectId.isValid(postId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }

    const foundPost: PostDBType | null = await postsQueryRepository.findPostById(postId)
    if (!foundPost) return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundPost)
}

export const updatePostController = async (req: Request, res: Response) => {
    const blog = await blogsQueryRepository.findBlogById(req.body.blogId)
    if (!blog) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Blog not exist");
    }

    const postId = req.params.postId;
    if (!ObjectId.isValid(postId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }

    const isUpdated: boolean = await postsService.updatePost(postId, req.body)
    if (isUpdated) {
        const post: PostDBType | null = await postsQueryRepository.findPostById(postId)
        return res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(post)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deletePostController = async (req: Request, res: Response) => {
    const postId = req.params.postId;
    if (!ObjectId.isValid(postId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }

    const isDeleted: boolean = await postsService.deletePost(postId)
    if (isDeleted) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}
