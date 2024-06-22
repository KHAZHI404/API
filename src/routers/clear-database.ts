import {Router} from "express";
import {db} from "../db/db";
import {SETTINGS} from "../settings";
import {blogCollection, postCollection, videoCollection} from "../db/mongodb";

export const clearDatabase = Router({})


clearDatabase.delete('/testing/all-data', async (req, res) => {
    db.videos.length = 0
    db.blogs.length = 0
    db.posts.length = 0

    await videoCollection.deleteMany({})
    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})

    res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
})