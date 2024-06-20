import {
    deleteVideoController,
    findVideoController,
    getVideosController,
    postVideosController,
    updateVideoController,
} from "../controllers/videos-controller";
import {Router} from "express";
import {errorsValidationMiddleware} from "../middlewares/errorsValidationMiddleware";
import {videoValidation} from "../middlewares/videoInputValidation";

export const videosRouter = Router({})


videosRouter.get('/', getVideosController);

videosRouter.post('/', videoValidation, errorsValidationMiddleware, postVideosController);

videosRouter.get('/:videoId', findVideoController);

videosRouter.put('/:videoId', videoValidation, errorsValidationMiddleware, updateVideoController);

videosRouter.delete('/:videoId', deleteVideoController);

