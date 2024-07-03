// получение доступа к бд
import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogDBModel} from "../types/blog-types";
import {PostDBModel} from "../types/post-types";
import {UserDBModel} from "../types/user-types";

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
const db: Db = client.db(SETTINGS.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDBModel> = db.collection<BlogDBModel>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDBModel> = db.collection<PostDBModel>(SETTINGS.POST_COLLECTION_NAME)
export const userCollection: Collection<UserDBModel> = db.collection<UserDBModel>(SETTINGS.POST_COLLECTION_NAME)

// проверка подключения к бд
export const connectToMongoDB = async () => {
    try {
        await client.connect()
        console.log('connected to mongoDB')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}