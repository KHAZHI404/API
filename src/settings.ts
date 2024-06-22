// файл со всеми настройками/константами/хардкодом приложения:

import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    ADMIN_AUTH: "admin:qwerty",
    MONGO_URL: "mongodb+srv://admin:qwerty123@cluster0.npyz4dt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    || 'mongodb://0.0.0.0:27017',
    DB_NAME: "social-network",
    BLOG_COLLECTION_NAME: "blogs",
    POST_COLLECTION_NAME: "posts",
    VIDEO_COLLECTION_NAME: "video",
    PATH: {
        VIDEOS: "/videos",
        BLOGS: "/blogs",
        POSTS: "/posts",
    },
    HTTP_STATUSES: {
        OK_200: 200,
        CREATED_201: 201,
        NO_CONTENT_204: 204,
        BAD_REQUEST_400: 400,
        NOT_FOUND_404: 404,
        NOT_AUTHORIZED_401: 401,
    }
}