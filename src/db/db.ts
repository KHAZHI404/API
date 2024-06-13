// простая база данных:

import {VideoDBType} from './video-db-type'
import {Resolutions} from "../input-output-types/video-types";

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    videos:  VideoDBType[]
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
    // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos = []
        // db.some = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
}