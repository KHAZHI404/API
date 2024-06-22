import {BlogDBType, CreateBlogType} from "../input-output-types/blog-types";
import {blogCollection} from "../db/mongodb";
import {ObjectId, WithId} from "mongodb";


export const blogsMongoRepository = {

    async findBlogs(name: string | null | undefined): Promise<BlogDBType[]> {
        const filter: any = {}
        if (name) {
            filter.name = { $regex: name, $options: "i" }
        }
        return await blogCollection.find(filter).toArray()
    },

    async createBlog(inputData: CreateBlogType) {
        const newBlog: BlogDBType = {
            ...inputData,
            createdAt: new Date().toISOString(),
            isMembership: false
        };

        await blogCollection.insertOne(newBlog)
        return newBlog
    },

    async findBlogById(blogId: string): Promise<WithId<BlogDBType> | null> {
        const foundBlog: WithId<BlogDBType> | null = await blogCollection.findOne({_id: new ObjectId(blogId)})
        if (foundBlog) {
            return foundBlog
        }
        return null
    },

    async updateBlog(blogId: string, inputData: CreateBlogType) {
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