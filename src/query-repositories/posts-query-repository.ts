import {PostDBType} from "../input-output-types/post-types";
import {postCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const postsQueryRepository = {

    async findPosts(title: string | null | undefined): Promise<PostDBType[]> {
        const filter: any = {}
        if (title) {
            filter.title = { $regex: title, $options: "i" }
        }
        return await postCollection.find(filter).toArray()
    },


    async findPostById(postId: string) {
        return await postCollection.findOne({_id: new ObjectId(postId)})
    },

    async findPostsForBlog(blogId: string) {
        return await postCollection.find({blogId: blogId}).toArray()
    }
}