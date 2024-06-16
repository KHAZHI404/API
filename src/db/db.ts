// простая база данных:

import {Resolutions, VideoDBType} from "../input-output-types/video-types";
import {BlogDBType} from "../input-output-types/blog-types";
import {PostDBType} from "../input-output-types/post-types";

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    videos:  VideoDBType[]
    blogs:  BlogDBType[]
    posts: PostDBType[]
    // some: any[]
}

export const db: DBType = { // создаём базу данных (пока это просто переменная)
    videos: [
        {
        "id": '1',
        "title": "string1",
        "author": "string1",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2024-06-11T14:36:52.380Z",
        "publicationDate": "2024-06-11T14:36:52.380Z",
        "availableResolution": [Resolutions.P144]
    },
        {
            "id": '2',
            "title": "string2",
            "author": "string2",
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2024-06-11T14:36:52.380Z",
            "publicationDate": "2024-06-11T14:36:52.380Z",
            "availableResolution": [Resolutions.P240]
        }
        ],
    blogs: [
        {
            "id": "1",
            "name": 'blog name 1',
            "description": 'blog description 1',
            "websiteUrl": 'blog websiteUrl 1',
        },
        {
            "id": "2",
            "name": 'blog name 2',
            "description": 'blog description 2',
            "websiteUrl": 'blog websiteUrl 2',
        }
    ],
    posts: [
        {
            "id": "1",
            "title": "string 1",
            "shortDescription": "string 1",
            "content": "string 1",
            "blogId": "1",
            "blogName": "string 1"
        },
        {
            "id": "2",
            "title": "string 2",
            "shortDescription": "string 2",
            "content": "string 2",
            "blogId": "1",
            "blogName": "string 2"
        }
    ]
    // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos = []
        db.blogs = []
        db.posts = []
        // db.some = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
}