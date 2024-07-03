import {PostDBModel, PostInputModel} from "../types/post-types";
import {postsDbRepository} from "../repositories/posts-db-repository";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";
import {BlogViewModel} from "../types/blog-types";
import {ObjectId} from "mongodb";


export const postsService = {

    async createPost(inputData: PostInputModel) {
        const blog: BlogViewModel | null = await blogsQueryRepository.findBlogById(inputData.blogId)
        if (!blog) return null

        const newPost: PostDBModel = {
            _id: new ObjectId(),
            title: inputData.title,
            shortDescription: inputData.shortDescription,
            content: inputData.content,
            blogId: inputData.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()

        }

        const post = await postsDbRepository.createPost(newPost)
        return post.insertedId
    },

    async updatePost(postId: string, input: PostInputModel) {
        return await postsDbRepository.updatePost(postId, input)
    },

    async deletePost(postId: string) {
        return await postsDbRepository.deletePost(postId)
    },


}