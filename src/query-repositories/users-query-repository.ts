import {
    calculatePagesCount,
    createPagination,
    createSortOptions
} from "../input-output-types/pagination-sorting";
import {UserDBModel, userMapper, UserViewModel} from "../input-output-types/user-types";
import {userCollection} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const usersQueryRepository = {

    async findUsers(page: number,
                    pageSize: number,
                    sortBy: string,
                    sortDirection: string,
                    searchLoginTerm: string | null,
                    searchEmailTerm: string | null) {
        const filter: any = {$or: []}
        if (searchLoginTerm) {
            filter["$or"].push({login: {$regex: searchLoginTerm, $options: 'i'}})
        }
        if (searchEmailTerm) {
            filter["$or"].push({email: {$regex: searchEmailTerm, $options: 'i'}})
        }
        if (filter["$or"].length === 0) {
            filter["$or"].push({})
        }

        // const searchLoginTerm = createSearchNameFilter(searchLoginTerm);
        // const searchEmailTerm = createSearchNameFilter(searchLoginTerm);
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

    async findByLoginOrEmail(userId: string) {
        const user = await userCollection.findOne({_id: new ObjectId(userId)} )
        return user
    },

    async findUserById(loginOrEmail: string) {
        const user = await userCollection.findOne({ $or: [ { login: loginOrEmail }, { email: loginOrEmail } ] } )
        if (user) {
            return userMapper(user)
        }
        return null
    }
}