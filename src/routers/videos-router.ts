import {Request, Response, Router} from "express";
import {SETTINGS} from "../settings";
import {db} from "../db/db";
import {getVideosController} from "../videos/getVideosController";


export const videosRouter = Router({})



videosRouter.delete('/testing/all-data', (req, res) => {
    db.videos.length = 0
    res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
})

videosRouter.get('/', (req, res) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        //ищем продукты через квери параметры
        const video = db.videos.filter(p => p.title.includes(searchString))
        getVideosController(req, res)
        return
    }
    getVideosController(req, res)
})

videosRouter.post('/', (req, res) => {
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

videosRouter.get('/:videoId', (req, res) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.videoId)
    if (!foundVideo) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideo)
})

videosRouter.put('/:videoId', (req, res) => {
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

videosRouter.delete('/:videoId', (req, res) => {
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

