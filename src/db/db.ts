// простая база данных:

import {BlogDBModel} from "../input-output-types/blog-types";
import {PostDBType} from "../input-output-types/post-types";
import {ObjectId, WithId} from "mongodb";

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    blogs:  BlogDBModel[]
    posts: PostDBType[]
    // some: any[]
}

export const db = { // создаём базу данных (пока это просто переменная)
    blogs: [
        {
            "_id": new ObjectId("66780909f49de34500ea57ae"),
            "name": 'blog name 1',
            "description": 'blog description 1',
            "websiteUrl": 'blog websiteUrl 1',
            "createdAt": "2024-06-11T14:36:52.380Z",
            isMembership: false
        },
        {
            "_id": new ObjectId("667809780ab6a3eb44fa0bb9"),
            "name": 'blog name 2',
            "description": 'blog description 2',
            "websiteUrl": 'blog websiteUrl 2',
            "createdAt": "2024-06-11T14:36:52.380Z",
            isMembership: false
        }
    ],
    posts: [
        {
            "title": "string 1",
            "shortDescription": "string 1",
            "content": "string 1",
            "blogId": "1",
            "blogName": "string 1",
            "createdAt": "2024-06-11T14:36:52.380Z",
        },
        {
            "title": "string 2",
            "shortDescription": "string 2",
            "content": "string 2",
            "blogId": "1",
            "blogName": "string 2",
            "createdAt": "2024-06-11T14:36:52.380Z",
        }
    ]
    // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: any) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.blogs.length = 0
        db.posts.length = 0
        // db.some = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    // db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
}