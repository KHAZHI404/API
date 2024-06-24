import {CreatePostType, PostDBType} from "../input-output-types/post-types";
import {postsDbRepository} from "../repositories/posts-db-repository";


export const postsService = {

    async createPost(inputData: CreatePostType, blogName: string) {
        const newPost: PostDBType = {
            ...inputData,
            blogName,
            createdAt: new Date().toISOString()
        }

        await postsDbRepository.createPost(newPost)
        return newPost
    },

    async updatePost(postId: string, input: CreatePostType) {
        return await postsDbRepository.updatePost(postId, input)
    },

    async deletePost(postId: string) {
        return await postsDbRepository.deletePost(postId)
    },


}