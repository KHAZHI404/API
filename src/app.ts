// файл создания приложения:

import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {videosRouter} from "./routers/videos-router";
import {getVideosController} from "./videos/getVideosController";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк




app.get(SETTINGS.PATH.VIDEOS, getVideosController)
app.use(SETTINGS.PATH.VIDEOS, videosRouter)