import {ObjectId} from "mongodb";

export type CommentDBModel = {
    _id: ObjectId
    // postId: string
    content: string
    commentatorInfo: CommentatorModel
    createdAt: string
}

export type CommentInputModel = {
    content: string
}

export type CommentViewModel = {
    id: string
    content: string
    commentatorInfo: CommentatorModel
    createdAt: string

}

export type CommentatorModel = {
    userId: string
    userLogin: string
}

export type Paginator<CommentViewModel> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:	CommentViewModel[]
}

export const commentMapper = (comment: CommentDBModel): CommentViewModel => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt
    }
}