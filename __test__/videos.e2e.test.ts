import {req} from './test-helpers'
import {setDB} from '../src/db/db'
import {SETTINGS} from '../src/settings'
import {InputVideoType, VideoDBType} from "../src/input-output-types/video-types";
import {videosTestManager} from "./videosTestManager";
// база данных для тестов
import { MongoMemoryServer } from 'mongodb-memory-server'
import {MongoClient} from "mongodb";


describe('/videos', async () => {

    // запуск виртуального сервера с временной бд
    const server = await MongoMemoryServer.create()

    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()

        const uri = server.getUri()
        const client: MongoClient = new MongoClient(uri)
        await client.connect()
    })

    afterAll(done => {
        done()
    })
    // остановка виртуально сервера с бд после выполнения тестов
    await server.stop()
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
        const data = {title: '', author: 'nice author'}
        await videosTestManager.createVideo(data, SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)


        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [])

    })


    let createdVideo1: VideoDBType;
    it("should create video with correct input data", async () => {
        const data: InputVideoType = {title: 'new title', author: 'new author'}

        const {createdEntity}  = await videosTestManager.createVideo(data)

        createdVideo1 = createdEntity


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
        const data = {title: 'nice title', author: 'nice author'}
        const res = await req
            .put(SETTINGS.PATH.VIDEOS + `/${createdVideo1.id}`)
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [{
                ...createdVideo1,
                title: data.title,
                author: data.author
            }])
    })

    let createdVideo2: VideoDBType;
    it("should create second video with correct input data", async () => {
        const data = {title: 'new second title', author: 'new second author'}
        const {createdEntity} = await videosTestManager.createVideo(data)

        createdVideo2 = createdEntity

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [
                {
                    ...createdVideo1,
                    title: 'nice title',
                    author: 'nice author'
                },
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
