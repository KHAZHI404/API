// получение доступа к бд
import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogDBModel} from "../input-output-types/blog-types";
import {PostDBType} from "../input-output-types/post-types";

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
const db: Db = client.db(SETTINGS.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDBModel> = db.collection<BlogDBModel>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)

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