import {commentCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {CommentDBModel, commentMapper, CommentViewModel} from "../types/comment-types";
import {
    calculatePagesCount,
    createPagination,
    createSortOptions
} from "../types/pagination-sorting";


export const commentsQueriesRepository = {

    async findCommentById(commentId: string): Promise<CommentViewModel | null> {
        const commentInDB: CommentDBModel | null = await commentCollection.findOne({_id: new ObjectId(commentId)})

        if (commentInDB) {
            return commentMapper(commentInDB)
        }
        return null
    },

    async findCommentsByPost(postId: string, // зачем мне тут постИд если я првеоряю есть ли он в контроллере?
                             page: number,
                             pageSize: number,
                             sortBy: string,
                             sortDirection: string) {

            const searchFilter = {postId: postId};
            const sortOptions = createSortOptions(sortBy, sortDirection);
            const totalCount = await commentCollection.countDocuments(searchFilter);
            const pagesCount = calculatePagesCount(totalCount, pageSize);
            const skip = createPagination(page, pageSize);

            const comments: CommentDBModel[] = await commentCollection
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
                items: comments.map(commentMapper)
            }
        },

}