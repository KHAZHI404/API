// получение доступа к бд
import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogDBType} from "../input-output-types/blog-types";
import {PostDBType} from "../input-output-types/post-types";
import {VideoDBType} from "../input-output-types/video-types";

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
const db: Db = client.db(SETTINGS.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)
export const videoCollection: Collection<VideoDBType> = db.collection<VideoDBType>(SETTINGS.VIDEO_COLLECTION_NAME)

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