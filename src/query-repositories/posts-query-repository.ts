import {Paginator, PostDBModel, postMapper, PostViewModel} from "../input-output-types/post-types";
import {postCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {
    calculatePagesCount,
    createPagination, createSearchNameFilter,
    createSortOptions
} from "../input-output-types/pagination-sorting";


export const postsQueryRepository = {

    async findPosts(page: number,
                    pageSize: number,
                    sortBy: string,
                    sortDirection: string) {
        const searchFilter = {};
        const sortOptions = createSortOptions(sortBy, sortDirection);
        const totalCount = await postCollection.countDocuments(searchFilter);
        const pagesCount = calculatePagesCount(totalCount, pageSize);
        const skip = createPagination(page, pageSize);

        const posts: PostDBModel[] = await postCollection
            .find(searchFilter)
            .sort(sortOptions)
            .skip(skip)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: posts.map(postMapper)
        }
    },


    async findPostById(postId: string): Promise<PostViewModel | null> {
        const postInDB = await postCollection.findOne({_id: new ObjectId(postId)})

        if (postInDB) {
            return postMapper(postInDB)
        }
        return null
    },

    async findPostsForBlog(blogId: string,
                           page: number,
                           pageSize: number,
                           sortBy: string,
                           sortDirection: string): Promise<Paginator<PostViewModel>> {

        const searchFilter = { blogId: blogId };
    const sortOptions = createSortOptions(sortBy, sortDirection);
    const totalCount = await postCollection.countDocuments(searchFilter);
    const pagesCount = calculatePagesCount(totalCount, pageSize);
    const skip = createPagination(page, pageSize);

    const posts: PostDBModel[] = await postCollection
        .find(searchFilter)
        .sort(sortOptions)
        .skip(skip)
        .limit(+pageSize)
        .toArray()

    return {
        pagesCount,
        page,
        pageSize,
        totalCount,
        items: posts.map(postMapper)
    }
},

}