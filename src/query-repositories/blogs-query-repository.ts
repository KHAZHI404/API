import {blogCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {BlogDBModel, blogMapper, BlogViewModel} from "../types/blog-types";
import {
    calculatePagesCount,
    createPagination, createSearchFilter,
    createSortOptions
} from "../types/pagination-sorting";



export const blogsQueryRepository = {

    async findBlogs(page: number,
                    pageSize: number,
                    sortBy: string,
                    sortDirection: string,
                    searchNameTerm: string | null) {
        const searchNameFilter = createSearchFilter(searchNameTerm, 'name');
        const sortOptions = createSortOptions(sortBy, sortDirection);
        const totalCount = await blogCollection.countDocuments(searchNameFilter);
        const pagesCount = calculatePagesCount(totalCount, pageSize);
        const skip = createPagination(page, pageSize);

        const blogs: BlogDBModel[] = await blogCollection
            .find(searchNameFilter)
            .sort(sortOptions)
            .skip(skip)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: blogs.map(blogMapper)
        }
    },

    async findBlogById(blogId: string): Promise<BlogViewModel | null>  {
        const blogInDB: BlogDBModel | null = await blogCollection.findOne({_id: new ObjectId(blogId)})

        if (blogInDB) {
            return blogMapper(blogInDB)
        }
        return null

    },

}
