// файл со всеми настройками/константами/хардкодом приложения:

import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3000,
    ADMIN_AUTH: process.env.ADMIN_AUTH || "admin:qwerty",
    MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
    JWT_SECRET: process.env.JWT_SECRET || "123",
    DB_NAME: "social-network",
    BLOG_COLLECTION_NAME: "blogs",
    POST_COLLECTION_NAME: "posts",
    USER_COLLECTION_NAME: "users",
    COMMENT_COLLECTION_NAME: "comments",
    PATH: {
        BLOGS: "/blogs",
        POSTS: "/posts",
        USERS: "/users",
        COMMENTS: "/comments",
        AUTH: "/auth"
    },
    HTTP_STATUSES: {
        OK_200: 200,
        CREATED_201: 201,
        NO_CONTENT_204: 204,
        BAD_REQUEST_400: 400,
        NOT_FOUND_404: 404,
        NOT_AUTHORIZED_401: 401,
        FOR_BIDDEN_403: 403,
    }
}