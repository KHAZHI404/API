import {db} from '../db/db'
import {CreatePostType, PostDBType} from "../input-output-types/post-types";
import {blogCollection, postCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {blogsMongoRepository} from "./blogs-mongo-repository";


export const postsMongoRepository = {

    async findPosts(title: string | null | undefined): Promise<PostDBType[]> {
        const filter: any = {}
        if (title) {
            filter.title = { $regex: title, $options: "i" }
        }
        return await postCollection.find(filter).toArray()
    },

    async createPost(input: CreatePostType, blogName: string) {
        const newPost: PostDBType = {
            ...input,
            blogName,
            createdAt: new Date().toISOString()
    }

        await postCollection.insertOne(newPost)
        return newPost
    },

    async findPostById(postId: string) {
        const foundPost = await postCollection.findOne({_id: new ObjectId(postId)})
        if (foundPost) {
            return foundPost
        }
        return null
    },

    async updatePost(postId: string, input: CreatePostType) {
        const result = await postCollection.updateOne({_id: new ObjectId(postId)}, {
        $set: {
            title: input.title,
            shortDescription: input.shortDescription,
            content: input.content,
            blogId: input.blogId,
        }})
        return result.matchedCount === 1
    },

    async deletePost(postId: string) {
        const result = await postCollection.deleteOne({_id: new ObjectId(postId)})
        return result.deletedCount === 1
    },


}