import {ObjectId} from "mongodb";

export type PostDBModel = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type PostViewModel = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type PostInputModel = {
    "title": string
    "shortDescription": string
    "content": string
    "blogId": string
}

export type Paginator<PostViewModel> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:	PostViewModel[]
}

export const postMapper = (post: PostDBModel): PostViewModel => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}