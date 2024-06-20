import {Resolutions, VideoDBType} from "../input-output-types/video-types";
import {videoCollection} from "../db/mongodb";


export const videosDBRepository = {

    async findVideos(title: string | null | undefined): Promise<VideoDBType[]> {
        const filter: any = {}
        if (title) {
            filter.title = { $regex: title, $options: "i" }
        }
        return await videoCollection.find(filter).toArray()
    },

    async createVideo(title: string, author: string): Promise<VideoDBType> {
        const newVideo: VideoDBType = {
            id: new Date().toISOString(),
            title,
            author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolution: [Resolutions.P360]
        }

        await videoCollection.insertOne(newVideo)
        return newVideo
    },

    async findVideoById(videoId: string): Promise<VideoDBType | null> {
        const foundVideo: VideoDBType | null = await videoCollection.findOne({videoId: videoId})
        if (foundVideo) {
            return foundVideo
        }
        return null
    },

    async updateVideo(videoId: string, title: string, author: string): Promise<boolean> {
        const result = await videoCollection.updateOne({videoId: videoId}, {
            $set: {
                title,
                author
            }
        })
        return result.matchedCount === 1
    },

    async deleteVideo(videoId: string): Promise<boolean> {
        const result = await videoCollection.deleteOne({videoId})
        return result.deletedCount === 1
    }

}