import {ObjectId} from "mongodb";

export type BlogDBModel = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type BlogInputModel = {
    name: string
    description: string
    websiteUrl: string
}

export type BlogQueryModel = {
    pageNumber: string
    pageSize: string
    sortBy: string
    sortDirection: string
    searchNameTerm: string
}

export type BlogViewModel = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type Paginator<BlogViewModel> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:	BlogViewModel[]
}

export const blogMapper = (blog: BlogDBModel): BlogViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}