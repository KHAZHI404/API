import {InputVideoType} from "../src/input-output-types/video-types";
import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";


export const videosTestManager = {


    async createVideo(data: InputVideoType, statusCode: number = SETTINGS.HTTP_STATUSES.CREATED_201) {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(data)
            .expect(statusCode)

        let createdEntity

        if (statusCode === SETTINGS.HTTP_STATUSES.CREATED_201) {
            createdEntity = res.body

            expect(createdEntity).toEqual({
                id: expect.any(String),
                title: data.title,
                author: data.author,
                canBeDownloaded: expect.any(Boolean),
                minAgeRestriction: null,
                createdAt: expect.any(String),
                publicationDate: expect.any(String),
                availableResolution: [
                    expect.any(String)
                ]
            })
        }

        return {res, createdEntity}
    }


}