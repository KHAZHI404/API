import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {CreatePostType, PostDBType} from "../src/input-output-types/post-types";
import {validationResult} from "express-validator";
import {MongoClient, ObjectId, WithId} from "mongodb";
import { MongoMemoryServer } from 'mongodb-memory-server'
import {blogCollection, postCollection} from "../src/db/mongodb";


describe('/posts', () => {
    const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')
    let server: MongoMemoryServer;
    let client: MongoClient;

    beforeAll(async () => { // очистка базы данных перед началом тестирования
        server = await MongoMemoryServer.create();
        const uri = server.getUri();
        client = new MongoClient(uri);
        await client.connect();
        await postCollection.deleteMany({})
    })

    afterAll(async () => {
        await client.close();
        await server.stop(); // остановка виртуально сервера с бд после выполнения тестов
    });

    it('should return 200 and get empty array', async () => {

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, []) // проверяем наличие эндпоинта

        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })

    it('should return 404 for not existing post', async () => {
        const id = new ObjectId()

        await req
            .get(`${SETTINGS.PATH.POSTS}/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`shouldn't create post with incorrect input data`, async () => {
        const data = {
            title: '',
            shortDescription: '',
            content: '',
            blogId: ''
        }
        await req
            .post(SETTINGS.PATH.POSTS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200)

        const errors = validationResult(req);

        expect(errors.isEmpty())
        expect(res.body.length).toBe(0)
    })


    let createdPost1: WithId<PostDBType>;
    it("should create post with correct input data", async () => {

        const data = {
            title: 'created title 1',
            shortDescription: 'created shortDescription 1',
            content: 'created content 1',
            blogId: '667693eacfda0f94dbff394f', // как проверить блогИд валидный или нет? существует ли такой блог вообще
        }

        // await req
        //     .get(`${SETTINGS.PATH.BLOGS}/${data.blogId}`)
        //     .expect(SETTINGS.HTTP_STATUSES.OK_200)

        const blog = await blogCollection.findOne({ _id: new ObjectId(data.blogId) });
        if (!blog) {
            throw new Error('Blog not found');
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.CREATED_201)

        createdPost1 = res.body

        expect(createdPost1).toEqual({
            _id: expect.any(String),
            title: data.title,
            shortDescription: data.shortDescription,
            content: data.content,
            blogId: data.blogId,
            blogName: expect.any(String),
            createdAt: expect.any(String),
        })

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdPost1])
    })

    it(`shouldn't update post with incorrect input data`, async () => {
        const data: CreatePostType = {
            title: 'new title',
            shortDescription: 'new shortDescription',
            content: '',
            blogId: 'new blogId'
        }
        await req
            .put(SETTINGS.PATH.POSTS + `/${createdPost1._id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdPost1])
    })

    it(`shouldn't update blog that not exist`, async () => {
        const id = new ObjectId()
        await req
            .put(SETTINGS.PATH.POSTS + `/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send({
                title: 'new title',
                shortDescription: 'new shortDescription',
                content: 'new content',
                blogId: '667693eacfda0f94dbff394f',
            })
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should update post with correct input data`, async () => {
        const data: CreatePostType = {
            title: 'updated title 1',
            shortDescription: 'updated shortDescription 1',
            content: 'updated content 1',
            blogId: '667693eacfda0f94dbff394f',
        }

        await req
            .get(`${SETTINGS.PATH.BLOGS}/${data.blogId}`)
            .expect(SETTINGS.HTTP_STATUSES.OK_200)

        const res = await req
            .put(SETTINGS.PATH.POSTS + `/${createdPost1._id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [{...createdPost1,
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId
            }])
    })

    let createdPost2: WithId<PostDBType>;
    it("should create second post with correct input data", async () => {
        const data = {
            title: 'created title 2',
            shortDescription: 'created shortDescription 2',
            content: 'created content 2',
            blogId: '667693eacfda0f94dbff394f'
        }

        await req
            .get(`${SETTINGS.PATH.BLOGS}/${data.blogId}`)
            .expect(SETTINGS.HTTP_STATUSES.OK_200)

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.CREATED_201)

        createdPost2 = res.body

        expect(createdPost2).toEqual({
            _id: expect.any(String),
            title: data.title,
            shortDescription: data.shortDescription,
            content: data.content,
            blogId: data.blogId,
            blogName: expect.any(String),
            createdAt: expect.any(String)

        })

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [
                {...createdPost1,
                    title: 'updated title 1',
                    shortDescription: 'updated shortDescription 1',
                    content: 'updated content 1',
                    blogId: '667693eacfda0f94dbff394f',},
                createdPost2])
    })

    it(`shouldn't delete post that not exist`, async () => {
        const id = new ObjectId()
        await req
            .delete(SETTINGS.PATH.POSTS + `/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should delete post`, async () => {
        await req
            .delete(SETTINGS.PATH.POSTS + `/${createdPost1._id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.POSTS + `/${createdPost1._id}`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdPost2])
    })


})