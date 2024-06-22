import {Response, Request} from 'express'
import {OutputVideoType, VideoDBType} from '../input-output-types/video-types'
import {SETTINGS} from "../settings";
import {videosMongoRepository} from "../repositories/videos-mongo-repository";


export const getVideosController = async (req: Request, res: Response<OutputVideoType[]>) => {
    const foundVideos: VideoDBType[] = await videosMongoRepository.findVideos(req.query.title?.toString())
    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideos) // отдаём видео в качестве ответа
}

export const postVideosController = async (req: Request, res: Response) => {
    const newVideo: VideoDBType = await videosMongoRepository.createVideo(req.body.title, req.body.author)
    return res.status(SETTINGS.HTTP_STATUSES.CREATED_201).send(newVideo);
}

export const findVideoController = async (req: Request, res: Response) => {
    const foundVideo: VideoDBType | null = await videosMongoRepository.findVideoById(req.params.videoId)
    if (!foundVideo) return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    return res.status(SETTINGS.HTTP_STATUSES.OK_200).send(foundVideo)
}

export const updateVideoController = async (req: Request, res: Response) => {
    const isUpdated: boolean = await videosMongoRepository.updateVideo(req.params.videoId, req.body.title, req.body.author)
    if (isUpdated) {
        const video: VideoDBType | null = await videosMongoRepository.findVideoById(req.params.videoId)
        return res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send(video)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

export const deleteVideoController = async (req: Request, res: Response) => {
    const isDeleted: boolean = await videosMongoRepository.deleteVideo(req.params.videoId)
    if (isDeleted) {
        return res.sendStatus(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)
    }
    return res.sendStatus(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
}

