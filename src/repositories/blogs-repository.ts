import {db} from '../db/db'
import {BlogDBType, CreateBlogType} from "../input-output-types/blog-types";


export const blogsRepository = {

    findBlogs(name: string | null | undefined) {
        if (name) {
            const searchProducts: BlogDBType[] = db.blogs.filter(b => b.name.includes(name))
            return searchProducts
        }
        return db.blogs
    },

    createBlog(inputData: CreateBlogType) {
        const newBlog: BlogDBType = {
            id: new Date().toISOString(),
            ...inputData,
        };

        db.blogs.push(newBlog);
        return newBlog
    },

    findBlogById(blogId: string) {
        const foundBlog = db.blogs.find(b => b.id === blogId)
        return foundBlog
    },

    updateBlog(blogId: string, inputData: CreateBlogType) {
        const foundBlog = db.blogs.find(b => b.id === blogId)
        if (foundBlog) {
            foundBlog.name = inputData.name
            foundBlog.description = inputData.description
            foundBlog.websiteUrl = inputData.websiteUrl
            return true
        }
        return false
    },

    deleteBlog(blogId: string,) {
        const foundBlog = db.blogs.find(b => b.id === blogId)
        if (!foundBlog) return false
        db.blogs = db.blogs.filter(b => b.id !== blogId)
        return  true
    },









}