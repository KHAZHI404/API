import {Router} from "express";
import {SETTINGS} from "../settings";
import {blogCollection, commentCollection, postCollection, userCollection} from "../db/mongodb";

export const clearDatabase = Router({})


clearDatabase.delete('/testing/all-data', async (req, res) => {

    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})
    await userCollection.deleteMany({})
    await commentCollection.deleteMany({})

    res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
})