import {req} from './test-helpers'
import {setDB} from '../src/db/db'
import {dataset1} from './datasets'
import {SETTINGS} from '../src/settings'
import {VideoDBType} from "../src/db/video-db-type";

describe('/videos', () => {

    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()
    })

    it('should return 200 and get empty array', async () => {

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200) // проверяем наличие эндпоинта

        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })

    it('should return 404 for not existing video', async () => {
        await req
            .get(`${SETTINGS.PATH.VIDEOS}/-100`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`shouldn't create video with incorrect input data`, async () => {
        await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({title: '', author: 'nice author'})
            .expect(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200)

        expect(res.body.length).toBe(0)
    })


    let createdVideo1: VideoDBType;
    it("should create video with correct input data", async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({title: 'new title', author: 'new author'})
            .expect(SETTINGS.HTTP_STATUSES.CREATED_201)

        createdVideo1 = res.body

        expect(createdVideo1).toEqual({
            id: expect.any(String),
            title: 'new title',
            author: 'new author',
            canBeDownloaded: expect.any(Boolean),
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolution: [
                expect.any(String)
            ]
        })

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdVideo1])
    })

    it(`shouldn't update video with incorrect input data`, async () => {
        await req
            .put(SETTINGS.PATH.VIDEOS + `/${createdVideo1.id}`)
            .send({title: 'sss', author: ''})
            .expect(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdVideo1])
    })

    it(`shouldn't update video that not exist`, async () => {
        await req
            .put(SETTINGS.PATH.VIDEOS + `/-100`)
            .send({title: 'nice title', author: 'nice author'})
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should update video with correct input data`, async () => {
        const res = await req
            .put(SETTINGS.PATH.VIDEOS + `/${createdVideo1.id}`)
            .send({title: 'nice title', author: 'nice author'})
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [{...createdVideo1, title: 'nice title', author: 'nice author'}])
    })

    let createdVideo2: VideoDBType;
    it("should create second video with correct input data", async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({title: 'new second title', author: 'new second author'})
            .expect(SETTINGS.HTTP_STATUSES.CREATED_201)

        createdVideo2 = res.body

        expect(createdVideo2).toEqual({
            id: expect.any(String),
            title: 'new second title',
            author: 'new second author',
            canBeDownloaded: expect.any(Boolean),
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolution: [
                expect.any(String)
            ]
        })

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [
                {...createdVideo1, title: 'nice title', author: 'nice author'},
                createdVideo2])
    })

    it(`shouldn't delete video that not exist`, async () => {
        await req
            .delete(SETTINGS.PATH.VIDEOS + `/-100`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should delete video`, async () => {
        await req
            .delete(SETTINGS.PATH.VIDEOS + `/${createdVideo1.id}`)
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.VIDEOS + `/${createdVideo1.id}`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdVideo2])
    })







})