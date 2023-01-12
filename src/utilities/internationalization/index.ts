import { NextFunction } from "express";
// @ts-ignore
import translatte from "translatte";

export const internationalizer = async (req: { body: { name: any; description: any; }; }, res: { status: (arg0: number) => void; }, next: NextFunction) => {
    try {
        const { name, description }:{name:string,description:string} = req.body;
      
        // be sure to have a name and a description
        if (!name || !description) {
            console.log(req)
            const error = new Error("Please provide a name and a description");
            res.status(400);
            next(error);
        }
        
     
        const { text: nameIt } = await translatte(name, { to: "it" });
        const { text: nameEn } = await translatte(name, { to: "en" });
        const { text: nameFr } = await translatte(name, { to: "fr" });
        const { text: nameDe } = await translatte(name, { to: "de" });
        const { text: nameRu } = await translatte(name, { to: "ru" });
        const { text: nameEs } = await translatte(name, { to: "es" });
        const { text: descriptionIt } = await translatte(description, { to: "it" });
        const { text: descriptionEn } = await translatte(description, { to: "en" });
        const { text: descriptionFr } = await translatte(description, { to: "fr" });
        const { text: descriptionDe } = await translatte(description, { to: "de" });
        const { text: descriptionRu } = await translatte(description, { to: "ru" });
        const { text: descriptionEs } = await translatte(description, { to: "es" });
        req.body.name = {
            it: nameIt,
            en: nameEn,
            fr: nameFr,
            de: nameDe,
            ru: nameRu,
            es: nameEs,
        };
        req.body.description = {
            it: descriptionIt,
            en: descriptionEn,
            fr: descriptionFr,
            de: descriptionDe,
            ru: descriptionRu,
            es: descriptionEs,
        };
        next();
    } catch (error) {
        next(error);
    }
};
