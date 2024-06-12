// файл создания приложения:

import express from 'express'
import cors from 'cors'
import {db} from "./db/db";
import {SETTINGS} from "./settings";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.delete('/testing/all-data', (req, res) => {
    db.videos.length = 0
    res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
})

app.get('/videos', (req, res) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        //ищем продукты через квери параметры
        const video = db.videos.filter(p => p.title.includes(searchString))
        res.status(SETTINGS.HTTP_STATUSES.OK_200).send(video)
        return
    }
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(db.videos)
})

app.post('/videos', (req, res) => {
    if (!req.body.title || !req.body.author) {
        res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send('Please enter a title (author)')
        return
    }
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2024-06-11T14:44:55.606Z",
        publicationDate: "2024-06-11T14:44:55.607Z",
        availableResolutions: [
            "P144"
        ]
    }

    db.videos.push(newVideo)
    res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newVideo)
})

app.get('/videos/:videoId', (req, res) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.videoId)
    if (!foundVideo) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideo)
})

app.put('/videos/:videoId', (req, res) => {
    if (!req.body.title || !req.body.author) {
        res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send('Please enter a title (author)')
        return
    }

    const foundVideo = db.videos.find(v => v.id === +req.params.videoId)
    if (foundVideo) {
        foundVideo.title = req.body.title
        foundVideo.author = req.body.author
        res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
})

app.delete('/videos/:videoId', (req, res) => {
    //     for (let i = 0; i < db.videos.length; i++) {
    //     if(db.videos[i].id === +req.params.videoId) {
    //         db.videos.splice(i, 1)
    //         res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    //     }
    // }
    const foundVideo = db.videos.find(v => v.id === +req.params.videoId)
    if (!foundVideo) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    db.videos = db.videos.filter(v => v.id !== +req.params.videoId)
    res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)


    // res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
})






// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)