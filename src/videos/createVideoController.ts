import {Response, Request} from 'express'
import {OutputErrorsType} from '../input-output-types/output-errors-type'
import {db} from '../db/db'
import {InputVideoType, OutputVideoType, Resolutions} from '../input-output-types/video-types'
import {VideoDBType} from "../db/video-db-type";
//
// const inputValidation = (video: InputVideoType) => {
//     const errors: OutputErrorsType = { // объект для сбора ошибок
//         errorsMessages: []
//     }
// // ...
//     if (!Array.isArray(video.availableResolution)
//         || video.availableResolution.find(p => !Resolutions[p])
//     ) {
//         errors.errorsMessages.push({
//             message: 'error!!!!', field: 'availableResolution'
//         })
//     }
//     return errors
// }
//
// export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
//     const errors: OutputErrorsType = inputValidation(req.body)
//     if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
//         res
//             .status(400)
//             .json(errors)
//         return
//     }
//
//     // если всё ок - добавляем видео
//     const newVideo: VideoDBType = {
//         ...req.body,
//         id: new Date().toISOString(),
//         canBeDownloaded: true,
//         minAgeRestriction: null,
//         createdAt: new Date().toISOString(),
//         publicationDate: new Date().toISOString(),
//     }
//     db.videos = [...db.videos, newVideo]
//
//     res
//         .status(201)
//         .json(newVideo)
// }
// controllers/videosController.ts


export const createVideoController = (req: Request, res: Response) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).send('Please enter a title and author');
    }

    const newVideo: VideoDBType = {
        id: new Date().toISOString(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolution: [Resolutions.P360]
    };

    // Предполагается, что у вас есть объект db, содержащий массив videos
    db.videos.push(newVideo);

    return res.status(201).json(newVideo);
};