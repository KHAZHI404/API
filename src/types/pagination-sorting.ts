// варианты задания дефолтных значений
export type CommonQueryModel = {
    pageNumber: string,
    pageSize: string
    sortBy: string
    sortDirection: string
    searchNameTerm: string
    searchLoginTerm: string
    searchEmailTerm: string
}

export function getPageOptions(query: CommonQueryModel) {

    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection === 'asc' ? 'asc' : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null,
    }
}

// Вспомогательная функция для создания фильтра по поиску
export function createSearchFilter(searchTerm: string | null, field: string) {
    if (searchTerm) {
        return { [field]: { $regex: searchTerm, $options: 'i' } };
    }
    return {};
}
// Вспомогательная функция для создания параметров сортировки
export function createSortOptions(sortBy: string, sortDirection: string): [string, 1 | -1] {
    return [sortBy, sortDirection === "asc" ? 1 : -1];
}
// Вспомогательная функция для подсчета страниц
export function calculatePagesCount(totalCount: number, pageSize: number) {
    return Math.ceil(totalCount / pageSize);
}

// Вспомогательная функция для создания пагинации
export function createPagination(page: number, pageSize: number) {
    return (page - 1) * pageSize;
}