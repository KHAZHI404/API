import {SortDirection} from "mongodb";
import {BlogDBModel, BlogViewModel} from "./blog-types";

export type OutputErrorsType = {
    errorsMessages: FieldError[];
}

export type FieldError = {
    message: string | null;
    field: string | null;
}

export interface QueryType {
    searchNameTerm?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    pageNumber: number;
    pageSize: number;
}



// варианты задания дефолтных значений
export function getPageOptions(query: any) {

    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        // sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        sortDirection: query.sortDirection === 'asc' ? 'asc' : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    }
}