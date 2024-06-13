import {db} from "../db/db";
import {SETTINGS} from "../settings";
import {Request, Response} from "express";

export const deleteVideoController = (req: Request, res: Response) => {
    const foundVideo = db.videos.find(v => v.id === req.params.videoId)
    if (!foundVideo) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    db.videos = db.videos.filter(v => v.id !== req.params.videoId)
    res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
}