import {
    deleteAllVideosController,
    deleteVideoController,
    findVideoController,
    getVideosController,
    postVideosController,
    updateVideoController,
} from "./videos-controller";
import {Router} from "express";

export const videosRouter = Router({})



videosRouter.get('/', getVideosController);
videosRouter.post('/', postVideosController);
videosRouter.get('/:videoId', findVideoController);
videosRouter.put('/:videoId', updateVideoController);
videosRouter.delete('/:videoId', deleteVideoController);
videosRouter.delete('/testing/all-data', deleteAllVideosController)
