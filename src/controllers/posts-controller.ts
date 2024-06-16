import {Response, Request} from 'express'
import {SETTINGS} from "../settings"
import {postsRepository} from "../repositories/posts-repository";
import {PostDBType} from "../input-output-types/post-types";


export const getPostsController = (req: Request, res: Response) => {
    const foundPosts = postsRepository.findPosts(req.query.name?.toString())
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundPosts)
}

export const postPostController = (req: Request, res: Response) => {
    const newPost: PostDBType = postsRepository.createPost(req.body)
    res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newPost);
}

export const findPostController = (req: Request, res: Response) => {
    const foundPost = postsRepository.findPostById(req.params.postId)
    if (!foundPost) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundPost)
}

export const updatePostController = (req: Request, res: Response) => {
    const isUpdated = postsRepository.updatePost(req.params.postId, req.body)
    if (isUpdated) {
        const post = postsRepository.findPostById(req.params.postId)
        res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(post)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deletePostController = (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePost(req.params.postId)
    if (isDeleted) {
        res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}
