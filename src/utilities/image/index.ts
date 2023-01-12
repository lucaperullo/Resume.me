import { NextFunction } from "express";

export const imageAdd = async (req: { file: { path: any; }; body: { cover: any; }; }, res: any, next: NextFunction) => {
    try {
        console.log(req.file)
        const image = req.file.path;
        // console.log(image)
        req.body.cover = image;
        next();
    } catch (error) {
        next(error);
    }
}