import { Router } from "express";

import experienceSchema from "./schema";
import { Request, Response, NextFunction } from "express";
import { internationalizer } from "../../utilities/internationalization";

const experiencesRouter = Router();

experiencesRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const experiences = await experienceSchema.find();

      res.send(experiences);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
);

experiencesRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      //populate company and location

      const experience = await experienceSchema
        .findById(id)
        .populate("company")
        .populate("location");

      if (experience) {
        res.send(experience);
      }
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
);

experiencesRouter.post(
  "/",
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newExperience = new experienceSchema(req.body);

      await newExperience.save();

      res
        .status(201)
        .send({ message: "Created", newExperience: newExperience });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

experiencesRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const experience = await experienceSchema.findByIdAndUpdate(
        req.params.id,
        req.body.location
      );

      if (experience) {
        res.send("Ok");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default experiencesRouter;
