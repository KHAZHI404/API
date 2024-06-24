import {CreatePostType, PostDBType} from "../input-output-types/post-types";
import {postCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const postsDbRepository = {

    async createPost(newPost: PostDBType) {
         await postCollection.insertOne(newPost)
        return newPost
    },

    async updatePost(postId: string, input: CreatePostType) {
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