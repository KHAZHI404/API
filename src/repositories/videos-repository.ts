// import {db} from '../db/db'
// import {Resolutions, VideoDBType} from "../input-output-types/video-types";
//
//
// export const videosRepository = {
//
//     async findVideos(title: string | null | undefined): Promise<VideoDBType[]> {
//         if (title) {
//             const searchProducts: VideoDBType[] = db.videos.filter(v => v.title.includes(title))
//             return searchProducts
//         }
//         return db.videos
//     },
//
//     async createVideo(title: string, author: string): Promise<VideoDBType> {
//         const newVideo: VideoDBType = {
//             id: new Date().toISOString(),
//             title,
//             author,
//             canBeDownloaded: true,
//             minAgeRestriction: null,
//             createdAt: new Date().toISOString(),
//             publicationDate: new Date().toISOString(),
//             availableResolution: [Resolutions.P360]
//         };
//
//         db.videos.push(newVideo);
//         return newVideo
//     },
//
//     async findVideoById(videoId: string): Promise<VideoDBType | null> {
//         const foundVideo = db.videos.find(v => v.id === videoId)
//         if (foundVideo) {
//             return foundVideo
//         }
//         return null
//     },
//
//     async updateVideo(videoId: string, title: string, author: string): Promise<boolean> {
//         const foundVideo = db.videos.find(v => v.id === videoId)
//         if (foundVideo) {
//             foundVideo.title = title
//             foundVideo.author = author
//             return true
//         }
//         return false
//     },
//
//     async deleteVideo(videoId: string): Promise<boolean> {
//         const foundVideo = db.videos.find(v => v.id === videoId)
//         if (!foundVideo) return false
//         db.videos = db.videos.filter(v => v.id !== videoId)
//         return  true
//     },
//
// }