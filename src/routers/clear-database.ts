import {Router} from "express";
import {db} from "../db/db";
import {SETTINGS} from "../settings";
import {blogCollection, postCollection, userCollection} from "../db/mongodb";

export const clearDatabase = Router({})


clearDatabase.delete('/testing/all-data', async (req, res) => {

    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})
    await userCollection.deleteMany({})

    res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
})