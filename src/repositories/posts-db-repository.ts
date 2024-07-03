import {postCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {PostDBModel, PostInputModel} from "../types/post-types";


export const postsDbRepository = {

    async createPost(newPost: PostDBModel) {
        return await postCollection.insertOne(newPost)
    },

    async updatePost(postId: string, input: PostInputModel) {
        const result = await postCollection.updateOne({_id: new ObjectId(postId)}, {
            $set: {
                title: input.title,
                shortDescription: input.shortDescription,
                content: input.content,
                blogId: input.blogId,
            }
        })
        return result.matchedCount === 1
    },

    async deletePost(postId: string) {
        const result = await postCollection.deleteOne({_id: new ObjectId(postId)})
        return result.deletedCount === 1
    },

}