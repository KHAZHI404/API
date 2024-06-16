import {Router} from "express";
import {db} from "../db/db";
import {SETTINGS} from "../settings";

export const clearDatabase = Router({})


clearDatabase.delete('/testing/all-data', (req, res) => {
    db.videos.length = 0
    db.blogs.length = 0
    db.posts.length = 0

    res.status(SETTINGS.HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
})