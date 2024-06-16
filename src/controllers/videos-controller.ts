import {Response, Request} from 'express'
import {OutputVideoType} from '../input-output-types/video-types'
import {SETTINGS} from "../settings";
import {videosRepository} from "../repositories/videos-repository";


export const getVideosController = (req: Request, res: Response<OutputVideoType[]>) => {
    const foundVideos = videosRepository.findVideos(req.query.title?.toString())
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideos) // отдаём видео в качестве ответа
}

export const postVideosController = (req: Request, res: Response) => {
    const newVideo = videosRepository.createVideo(req.body.title, req.body.author)
    res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newVideo);
};

export const findVideoController = (req: Request, res: Response) => {
    const foundVideo = videosRepository.findVideoById(req.params.videoId)
    if (!foundVideo) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideo)
}

export const updateVideoController = (req: Request, res: Response) => {
    const isUpdated = videosRepository.updateVideo(req.params.videoId, req.body.title, req.body.author)
    if (isUpdated) {
        const video = videosRepository.findVideoById(req.params.videoId)
        res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(video)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deleteVideoController = (req: Request, res: Response) => {
    const isDeleted = videosRepository.deleteVideo(req.params.videoId)
    if (isDeleted) {
        res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deleteAllVideosController = (req: Request, res: Response) => {
    const isDeletedAll = videosRepository.deleteAllVideos()
    if (isDeletedAll) res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
}