// файл с процессом запуска приложения:

import {app} from './app'
import {SETTINGS} from './settings'
import {connectToMongoDB} from "./db/mongodb";



const startApp = async () => {
    await connectToMongoDB()
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port ' + SETTINGS.PORT)
    })
}

startApp()