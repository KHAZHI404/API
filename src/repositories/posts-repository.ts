// import {db} from '../db/db'
// import {CreatePostType, PostDBType} from "../input-output-types/post-types";
//
//
// export const postsRepository = {
//
//     async findPosts(title: string | null | undefined) {
//         if (title) {
//             const searchProducts: PostDBType[] = await db.posts.filter(p => p.title.includes(title))
//             return searchProducts
//         }
//         return db.posts
//     },
//
//     async createPost(input: CreatePostType) {
//         const newPost: PostDBType = {
//             ...input,
//             id: new Date().toISOString(),
//             blogName: 'new blog name',
//             createdAt: new Date().toISOString()
//     }
//
//         await db.posts.push(newPost);
//         return newPost
//     },
//
//     async findPostById(postId: string) {
//         const foundPost = await db.posts.find(p => p.id === postId)
//         return foundPost
//     },
//
//     async updatePost(postId: string, input: CreatePostType) {
//         const foundPost = await db.posts.find(p => p.id === postId)
//         if (foundPost) {
//             foundPost.title = input.title
//             foundPost.shortDescription = input.shortDescription
//             foundPost.content = input.content
//             foundPost.blogId = input.blogId
//             return true
//         }
//         return false
//     },
//
//     async deletePost(postId: string) {
//         const foundPost = await db.posts.find(p => p.id === postId)
//         if (!foundPost) return false
//         db.posts = db.posts.filter(p => p.id !== postId)
//         return  true
//     },
//
//
// }