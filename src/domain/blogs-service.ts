import {blogsDbRepository} from "../repositories/blogs-db-repository";
import {BlogDBModel, BlogInputModel} from "../types/blog-types";
import {ObjectId} from "mongodb";


export const blogsService = {

    async createBlog(inputData: BlogInputModel) {

        const newBlog: BlogDBModel = {
            _id: new ObjectId(),
            name: inputData.name,
            description: inputData.description,
            websiteUrl: inputData.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const blog = await blogsDbRepository.createBlog(newBlog)
        return blog.insertedId
    },

    async updateBlog(blogId: string, inputData: BlogInputModel) {
        return await blogsDbRepository.updateBlog(blogId, inputData)
    },

    async deleteBlog(blogId: string) {
        return blogsDbRepository.deleteBlog(blogId)
    },


}