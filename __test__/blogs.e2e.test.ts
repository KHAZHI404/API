import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {ObjectId, WithId} from "mongodb";
import { MongoMemoryServer } from 'mongodb-memory-server'
import {MongoClient} from "mongodb";
import {blogCollection} from "../src/db/mongodb";
import {BlogDBModel} from "../src/input-output-types/blog-types";


describe('/blogs', () => {
    const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')
    let server: MongoMemoryServer;
    let client: MongoClient;

    beforeAll(async () => {
        server = await MongoMemoryServer.create();
        const uri = server.getUri();
        client = new MongoClient(uri);
        await client.connect();
        await blogCollection.deleteMany({})
    });

    afterAll(async () => {
        await client.close();
        await server.stop(); // остановка виртуально сервера с бд после выполнения тестов
    });

    it('should return 200 and get empty array', async () => {

        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, []) // проверяем наличие эндпоинта

        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })

    it('should return 404 for not existing blog', async () => {
        const id = new ObjectId()
        await req
            .get(`${SETTINGS.PATH.BLOGS}/${id}`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`shouldn't create blog with incorrect input data`, async () => {
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send({
                name: '',
                description: 'nice author',
                websiteUrl: "https://some.com"
            })
            .expect(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200)

        console.log(res.body)
        expect(res.body.length).toBe(0)
    })


    let createdBlog1: BlogDBModel;
    it("should create blog with correct input data", async () => {
        const data = {
            name: 'BLOG NAME',
            description: 'nice description',
            websiteUrl: 'https://it-family.com'
        }
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.CREATED_201)

        createdBlog1 = res.body

        expect(createdBlog1).toEqual({
            _id: expect.any(String),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt: expect.any(String),
            isMembership: false
        })

        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdBlog1])
    })

    it(`shouldn't update blog with incorrect input data`, async () => {
        const data = {name: '',
            description: 'nice author',
            websiteUrl: ''}
        await req
            .put(SETTINGS.PATH.BLOGS + `/${createdBlog1._id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.BAD_REQUEST_400)

        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdBlog1])
    })

    it(`shouldn't update blog that not exist`, async () => {
        const id = new ObjectId()

        await req
            .put(SETTINGS.PATH.BLOGS + `/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send({
                name: 'BLOG NAME',
                description: 'nice description',
                websiteUrl: 'https://link.com'
            })
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should update blog with correct input data`, async () => {
        const data = {
            name: 'new NAME',
            description: 'new description',
            websiteUrl: 'https://link.com'
        }
        const res = await req
            .put(SETTINGS.PATH.BLOGS + `/${createdBlog1._id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [{
                ...createdBlog1,
                name: data.name,
                description: data.description,
                websiteUrl: data.websiteUrl
            }])
    })

    let createdBlog2: BlogDBModel;
    it("should create second blog with correct input data", async () => {
        const data = {
            name: 'BLOG NAME 2',
            description: 'nice description 2',
            websiteUrl: 'https://link2.com'
        }
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(data)
            .expect(SETTINGS.HTTP_STATUSES.CREATED_201)

        createdBlog2 = res.body

        expect(createdBlog2).toEqual({
            _id: expect.any(String),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt: expect.any(String),
            isMembership: false
        })

        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [
                {...createdBlog1, name: 'new NAME', description: 'new description', websiteUrl: 'https://link.com'},
                createdBlog2])
    })

    it(`shouldn't delete blog that not exist`, async () => {
        const id = new ObjectId()
        await req
            .delete(SETTINGS.PATH.BLOGS + `/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should delete blog`, async () => {
        await req
            .delete(SETTINGS.PATH.BLOGS + `/${createdBlog1._id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(SETTINGS.HTTP_STATUSES.NO_CONTENT_204)

        await req
            .get(SETTINGS.PATH.BLOGS + `/${createdBlog1._id}`)
            .expect(SETTINGS.HTTP_STATUSES.NOT_FOUND_404)

        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(SETTINGS.HTTP_STATUSES.OK_200, [createdBlog2])
    })
})