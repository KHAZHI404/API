import {db} from "../db/db";
import {SETTINGS} from "../settings";
import {Request, Response} from "express";

export const findVideoController = (req: Request, res: Response) => {
    const foundVideo = db.videos.find(v => v.id === req.params.videoId)
    if (!foundVideo) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideo)
}