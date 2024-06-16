import {setDB} from "../src/db/db";
import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {PostDBType} from "../src/input-output-types/post-types";
import {validationResult} from "express-validator";


describe('/posts', () => {

    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()
    })

    it('should return 200 and get empty array', async () => {

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200) // проверяем наличие эндпоинта

        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })

    it('should return 404 for not existing post', async () => {
        await req
            .get(`${SETTINGS.PATH.POSTS}/-100`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`shouldn't create post with incorrect input data`, async () => {
        await req
            .post(SETTINGS.PATH.POSTS)
            .send({
                title: '',
                shortDescription: '',
                content: '',
                blogId: ''
            })
            .expect(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200)

        const errors = validationResult(req);

        expect(errors.isEmpty())
        expect(res.body.length).toBe(0)
    })


    let createdPost1: PostDBType;
    it("should create post with correct input data", async () => {
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .send({
                title: 'created title 1',
                shortDescription: 'created shortDescription 1',
                content: 'created content 1',
                blogId: 'created blogId 1',
            })
            .expect(SETTINGS.HTTP_STATUSES.CREATED_201)

        createdPost1 = res.body

        expect(createdPost1).toEqual({
            id: expect.any(String),
            title: 'created title 1',
            shortDescription: 'created shortDescription 1',
            content: 'created content 1',
            blogId: 'created blogId 1',
            blogName: expect.any(String),
        })

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdPost1])
    })

    it(`shouldn't update post with incorrect input data`, async () => {
        await req
            .put(SETTINGS.PATH.POSTS + `/${createdPost1.id}`)
            .send({
                title: 'new title',
                shortDescription: 'new shortDescription',
                content: '',
                blogId: 'new blogId'
            })
            .expect(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdPost1])
    })

    it(`shouldn't update blog that not exist`, async () => {
        await req
            .put(SETTINGS.PATH.POSTS + `/-100`)
            .send({
                title: 'new title',
                shortDescription: 'new shortDescription',
                content: 'new content',
                blogId: 'new blogId',
            })
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should update post with correct input data`, async () => {
        const res = await req
            .put(SETTINGS.PATH.POSTS + `/${createdPost1.id}`)
            .send({
                title: 'updated title 1',
                shortDescription: 'updated shortDescription 1',
                content: 'updated content 1',
                blogId: 'updated blogId 1',
            })
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [{...createdPost1,
                title: 'updated title 1',
                shortDescription: 'updated shortDescription 1',
                content: 'updated content 1',
                blogId: 'updated blogId 1'
            }])
    })

    let createdPost2: PostDBType;
    it("should create second post with correct input data", async () => {
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .send({
                title: 'created title 2',
                shortDescription: 'created shortDescription 2',
                content: 'created content 2',
                blogId: 'created blogId 2'
            })
            .expect(SETTINGS.HTTP_STATUSES.CREATED_201)

        createdPost2 = res.body

        expect(createdPost2).toEqual({
            id: expect.any(String),
            title: 'created title 2',
            shortDescription: 'created shortDescription 2',
            content: 'created content 2',
            blogId: 'created blogId 2',
            blogName: expect.any(String)

        })

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [
                {...createdPost1,
                    title: 'updated title 1',
                    shortDescription: 'updated shortDescription 1',
                    content: 'updated content 1',
                    blogId: 'updated blogId 1',},
                createdPost2])
    })

    it(`shouldn't delete post that not exist`, async () => {
        await req
            .delete(SETTINGS.PATH.POSTS + `/-100`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should delete post`, async () => {
        await req
            .delete(SETTINGS.PATH.POSTS + `/${createdPost1.id}`)
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.POSTS + `/${createdPost1.id}`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdPost2])
    })


})