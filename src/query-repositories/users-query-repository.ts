import {
    calculatePagesCount,
    createPagination,
    createSearchFilter,
    createSortOptions
} from "../types/pagination-sorting";
import {UserDBModel, userMapper, UserViewModel} from "../types/user-types";
import {userCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const usersQueryRepository = {

    async findUsers(page: number,
                    pageSize: number,
                    sortBy: string,
                    sortDirection: string,
                    searchLoginTerm: string | null,
                    searchEmailTerm: string | null) {
        const filter: any = { $or: [] };

        // Используем универсальную функцию для создания фильтров
        const loginFilter = createSearchFilter(searchLoginTerm, 'userName');
        const emailFilter = createSearchFilter(searchEmailTerm, 'email');

        if (Object.keys(loginFilter).length > 0) {
            filter.$or.push(loginFilter);
        }
        if (Object.keys(emailFilter).length > 0) {
            filter.$or.push(emailFilter);
        }

        // Если нет условий поиска, добавляем пустой объект для избежания ошибки
        if (filter.$or.length === 0) {
            filter.$or.push({});
        }

        const sortOptions = createSortOptions(sortBy, sortDirection);
        const totalCount = await userCollection.countDocuments(filter);
        const pagesCount = calculatePagesCount(totalCount, pageSize);
        const skip = createPagination(page, pageSize);

        const users: UserDBModel[] = await userCollection
            .find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: users.map(userMapper)
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        return await userCollection.findOne({ $or: [ { "userName": loginOrEmail }, { "email": loginOrEmail } ] } )
    },

    async findUserById(userId: string): Promise<UserViewModel | null> {
        const user = await userCollection.findOne({_id: new ObjectId(userId)})
        if (user) {
            return userMapper(user)
        }
        return null
    }
}