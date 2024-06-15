import {db} from '../db/db'
import {VideoDBType} from "../db/video-db-type";
import {Resolutions} from "../input-output-types/video-types";
import {SETTINGS} from "../settings";


export const videosRepository = {

    findVideos(title: string | null | undefined) {
        if (title) {
            const searchProducts: VideoDBType[] = db.videos.filter(v => v.title.includes(title))
            return searchProducts
        }
        return db.videos
    },

    createVideo(title: string, author: string) {
        const newVideo: VideoDBType = {
            id: new Date().toISOString(),
            title,
            author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolution: [Resolutions.P360]
        };

        db.videos.push(newVideo);
        return newVideo
    },

    findVideoById(videoId: string) {
        const foundVideo = db.videos.find(v => v.id === videoId)
        return foundVideo
    },

    updateVideo(videoId: string, title: string, author: string) {
        const foundVideo = db.videos.find(v => v.id === videoId)
        if (foundVideo) {
            foundVideo.title = title
            foundVideo.author = author
            return true
        }
        return false
    },

    deleteVideo(videoId: string,) {
        const foundVideo = db.videos.find(v => v.id === videoId)
        if (!foundVideo) return false
        db.videos = db.videos.filter(v => v.id !== videoId)
        return  true
    },

    deleteAllVideos() {
        db.videos.length = 0
        return true
    }










}