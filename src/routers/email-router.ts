import {Router} from "express";
import {emailController} from "../controllers/email-controller";

export const emailRouter = Router({});

emailRouter.post('/send', emailController)