import {Request, Response} from "express";
import {SETTINGS} from "../settings";
import {db} from "../db/db";

export const updateVideoController = (req: Request, res: Response) => {
    if (!req.body.title || !req.body.author) {
        res.status(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400).send('Please enter a title (author)')
        return
    }

    const foundVideo = db.videos.find(v => v.id === req.params.videoId)
    if (foundVideo) {
        foundVideo.title = req.body.title
        foundVideo.author = req.body.author
        res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}