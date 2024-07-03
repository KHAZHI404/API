import {BlogDBModel, BlogInputModel} from "../types/blog-types";
import {blogCollection} from "../db/mongodb";
import {InsertOneResult, ObjectId} from "mongodb";


export const blogsDbRepository = {

    async createBlog(newBlog: BlogDBModel) {
        return await blogCollection.insertOne(newBlog)
    },

    async updateBlog(blogId: string, inputData: BlogInputModel) {
        const result = await blogCollection.updateOne({_id: new ObjectId(blogId)}, {
            $set: {
                name: inputData.name,
                description: inputData.description,
                websiteUrl: inputData.websiteUrl
            }
        })
        return result.matchedCount === 1
    },

    async deleteBlog(blogId: string) {
        const result = await blogCollection.deleteOne({_id: new ObjectId(blogId)})
        return result.deletedCount === 1
    },

}