import {ObjectId} from "mongodb";
import {BlogDBModel, BlogViewModel} from "./blog-types";

export type CommentDBModel = {
    _id: ObjectId
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