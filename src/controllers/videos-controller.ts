import {Response, Request} from 'express'
import {OutputVideoType} from '../input-output-types/video-types'
import {SETTINGS} from "../settings";
import {videosDBRepository} from "../repositories/videos-db-repository";


export const getVideosController = async (req: Request, res: Response<OutputVideoType[]>) => {
    const foundVideos = await videosDBRepository.findVideos(req.query.title?.toString())
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideos) // отдаём видео в качестве ответа
}

export const postVideosController = async (req: Request, res: Response) => {
    const newVideo = await videosDBRepository.createVideo(req.body.title, req.body.author)
    res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newVideo);
};

export const findVideoController = async (req: Request, res: Response) => {
    const foundVideo = await videosDBRepository.findVideoById(req.params.videoId)
    if (!foundVideo) res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideo)
}

export const updateVideoController = async (req: Request, res: Response) => {
    const isUpdated = await videosDBRepository.updateVideo(req.params.videoId, req.body.title, req.body.author)
    if (isUpdated) {
        const video = await videosDBRepository.findVideoById(req.params.videoId)
        res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(video)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deleteVideoController = async (req: Request, res: Response) => {
    const isDeleted = await videosDBRepository.deleteVideo(req.params.videoId)
    if (isDeleted) {
        res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

