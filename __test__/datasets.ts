import {BlogDBType} from "../src/input-output-types/blog-types";
import {ObjectId} from "mongodb";

// готовые данные для переиспользования в тестах

export const blog1: BlogDBType = {
        _id: new ObjectId("667809780ab6a3eb44fa0bb8"),
        name: "blog name 1",
        description: "description 1",
        websiteUrl: "https://www.google.com",
        createdAt: new Date().toISOString(),
        isMembership: false,
}

// ...

export const dataset1 = {
    blogs: [blog1],
}

// ...