import {Request, Response} from "express";
import {CommonQueryModel, getPageOptions} from "../input-output-types/pagination-sorting";
import {Paginator} from "../input-output-types/blog-types";
import {SETTINGS} from "../settings";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
import {UserViewModel} from "../input-output-types/user-types";
import {usersService} from "../domain/users-service";
import {ObjectId} from "mongodb";


export const getUsersController = async (req: Request<{},{},{},CommonQueryModel>, res: Response) => {
    const {pageNumber, pageSize, sortBy, sortDirection,
        searchLoginTerm, searchEmailTerm} = getPageOptions(req.query);

    const foundUsers: Paginator<UserViewModel> = await usersQueryRepository.findUsers(
        pageNumber, pageSize, sortBy, sortDirection, searchLoginTerm, searchEmailTerm)

    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundUsers)
}

export const postUserController = async (req: Request, res: Response) => {
    const userInDB = await usersService.createUser(req.body)
    // const user = await usersQueryRepository.findByLoginOrEmail(userInDB)

    res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(userInDB);
}

export const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId
    if (!ObjectId.isValid(userId)) {
        return res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
    const isDeleted: boolean = await usersService.deleteUser(userId)
    if (isDeleted) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}