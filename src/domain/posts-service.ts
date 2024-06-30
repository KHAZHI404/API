import {CreatePostType, PostDBModel} from "../input-output-types/post-types";
import {postsDbRepository} from "../repositories/posts-db-repository";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";


export const postsService = {

    async createPost(inputData: CreatePostType) {
        const blog = await blogsQueryRepository.findBlogById(inputData.blogId)
        if (!blog) return null

        const newPost = {
            title: inputData.title,
            shortDescription: inputData.shortDescription,
            content: inputData.content,
            blogId: inputData.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()

        }

        return await postsDbRepository.createPost(newPost)
    },

    async updatePost(postId: string, input: CreatePostType) {
        return await postsDbRepository.updatePost(postId, input)
    },

    async deletePost(postId: string) {
        return await postsDbRepository.deletePost(postId)
    },


}