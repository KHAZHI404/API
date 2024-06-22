// import {db} from '../db/db'
// import {BlogDBType, CreateBlogType} from "../input-output-types/blog-types";
//
//
// export const blogsRepository = {
//
//     async findBlogs(name: string | null | undefined) {
//         if (name) {
//             const searchProducts: BlogDBType[] = db.blogs.filter(b => b.name.includes(name))
//             return searchProducts
//         }
//         return await db.blogs
//     },
//
//     async createBlog(inputData: CreateBlogType) {
//         const newBlog: BlogDBType = {
//             id: new Date().toISOString(),
//             ...inputData,
//             createdAt: new Date().toISOString(),
//             isMembership: false
//         };
//
//         await db.blogs.push(newBlog);
//         return newBlog
//     },
//
//     async findBlogById(blogId: string) {
//         const foundBlog = await db.blogs.find(b => b.id === blogId)
//         return foundBlog
//     },
//
//     async updateBlog(blogId: string, inputData: CreateBlogType) {
//         const foundBlog = await db.blogs.find(b => b.id === blogId)
//         if (foundBlog) {
//             foundBlog.name = inputData.name
//             foundBlog.description = inputData.description
//             foundBlog.websiteUrl = inputData.websiteUrl
//             return true
//         }
//         return false
//     },
//
//     async deleteBlog(blogId: string,) {
//         const foundBlog = db.blogs.find(b => b.id === blogId)
//         if (!foundBlog) return false
//         db.blogs = await db.blogs.filter(b => b.id !== blogId)
//         return  true
//     },
//
// }