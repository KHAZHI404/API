import {blogCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {BlogDBModel, blogMapper, BlogViewModel, Paginator} from "../input-output-types/blog-types";

export const blogsQueryRepository = {

    async findBlogs(page: number,
                    pageSize: number,
                    sortBy: string,
                    sortDirection: string,
                    searchNameTerm: string | null): Paginator<BlogViewModel[]> {

        let searchNameFilter = {}
        if (searchNameTerm) {
            searchNameFilter = {name: {$regex: searchNameTerm, $options: 'i'}}
        }
        let sortOptions: { [key: string]: 1 | -1}  = {
            [sortBy]: -1
        }
        if (sortDirection === "asc") {
            sortOptions[sortBy] = 1
        }
        const totalCount = await blogCollection.countDocuments(searchNameFilter)
        const pagesCount = Math.ceil(totalCount / +pageSize)
        const scip = (+page - 1) * +pageSize

        const blogs = await blogCollection
            .find(searchNameFilter)
            .sort(sortOptions)
            .skip(scip)
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



    async findBlogById(blogId: string): Promise<BlogViewModel | null> {
        const blog: BlogDBModel | null = await blogCollection.findOne({_id: new ObjectId(blogId)})

        // return (blogMapper(blog))
        // if (blog) {
        //     return {
        //         id: blogId,
        //         name: blog.name,
        //         description: blog.description,
        //         websiteUrl: blog.websiteUrl,
        //         createdAt: blog.createdAt,
        //         isMembership: blog.isMembership
        //     };
        // } else {
        //     return null
        // }

    },

}


// // Формирует фильтр для запроса в базу данных
// function createFilter(blogId: any, searchNameTerm: any) {
//     const byId = blogId ? { blogId: new ObjectId(blogId) } : {};
//     const search = searchNameTerm ? { title: { $regex: searchNameTerm, $options: 'i' } } : {};
//     return { ...byId, ...search };
// }
//
// // Функция для выполнения запроса в базу данных
// async function fetchPosts(postCollection: any, filter: any, query: any) {
//     try {
//         const items = await postCollection
//             .find(filter)
//             .sort(query.sortBy, query.sortDirection)
//             .skip((query.pageNumber - 1) * query.pageSize)
//             .limit(query.pageSize)
//             .toArray();
//
//         return items;
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         throw error;
//     }
// }
//
// // Функция для подсчета документов
// async function countPosts(postCollection: any, filter: any) {
//     try {
//         const totalCount = await postCollection.countDocuments(filter);
//         return totalCount;
//     } catch (error) {
//         console.error("Error counting posts:", error);
//         throw error;
//     }
// }
// // Функция для форматирования ответа
// function formatResponse(items: any, totalCount: any, query: any) {
//     return {
//         pagesCount: Math.ceil(totalCount / query.pageSize),
//         page: query.pageNumber,
//         pageSize: query.pageSize,
//         totalCount,
//         items: items.map(blogMapper(items))
//     };
// }