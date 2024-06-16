import {db} from '../db/db'
import {CreatePostType, PostDBType} from "../input-output-types/post-types";


export const postsRepository = {

    findPosts(title: string | null | undefined) {
        if (title) {
            const searchProducts: PostDBType[] = db.posts.filter(p => p.title.includes(title))
            return searchProducts
        }
        return db.posts
    },

    createPost(input: CreatePostType) {
        const newPost: PostDBType = {
            ...input,
            id: new Date().toISOString(),
            blogName: 'new blog name'
    }

        db.posts.push(newPost);
        return newPost
    },

    findPostById(postId: string) {
        const foundPost = db.posts.find(p => p.id === postId)
        return foundPost
    },

    updatePost(postId: string, input: CreatePostType) {
        const foundPost = db.posts.find(p => p.id === postId)
        if (foundPost) {
            foundPost.title = input.title
            foundPost.shortDescription = input.shortDescription
            foundPost.content = input.content
            foundPost.blogId = input.blogId
            return true
        }
        return false
    },

    deletePost(postId: string) {
        const foundPost = db.posts.find(p => p.id === postId)
        if (!foundPost) return false
        db.posts = db.posts.filter(p => p.id !== postId)
        return  true
    },









}