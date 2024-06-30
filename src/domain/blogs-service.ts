import {blogsDbRepository} from "../repositories/blogs-db-repository";
import {BlogDBModel, BlogInputModel} from "../input-output-types/blog-types";


export const blogsService = {

    async createBlog(inputData: BlogInputModel): Promise<BlogDBModel> {
        const newBlog = {
            ...inputData,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        return await blogsDbRepository.createBlog(newBlog)
    },

    async updateBlog(blogId: string, inputData: BlogInputModel) {
        return await blogsDbRepository.updateBlog(blogId, inputData)
    },

    async deleteBlog(blogId: string) {
        return blogsDbRepository.deleteBlog(blogId)
    },


}