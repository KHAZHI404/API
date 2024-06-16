// // ...
//
// import {NextFunction} from "express";
//
// export const ADMIN_AUTH = 'admin:qwerty' // get from SETTINGS
// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const auth = req.headers['authorisation'] as string // 'Basic xxxx'
//     console.log(auth)
//     if (!auth) {
//         res
//             .status(401)
//             .json({})
//         return
//     }
//     const buff = Buffer.from(auth.slice(6), 'base64')
//     const decodedAuth = buff.toString('utf8')
//
//     const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
//     const codedAuth = buff2.toString('base64')
//
//     // if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
//     if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== 'Basic ') {
//         res
//             .status(401)
//             .json({})
//         return
//     }
//
//     next()
// }
// import { NextFunction, Request, Response } from "express";
//
// export const ADMIN_AUTH = 'admin:qwerty'; // Получить из SETTINGS
// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const auth = req.headers['authorization'] as string; // 'Basic xxxx'
//
//     if (!auth || !auth.startsWith('Basic ')) {
//         return res.status(401).json({ error: "Authorization header missing or not in correct format" });
//     }
//
//     const encodedCredentials = auth.split(' ')[1];
//     const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
//
//     const [username, password] = decodedCredentials.split(':');
//
//     if (username !== 'admin' || password !== 'qwerty') {
//         return res.status(401).json({ error: "Invalid credentials" });
//     }
//
//     next();
// };
//
// export default authMiddleware;