import { Router } from "express";

import experienceSchema from "./schema";

import { Request, Response, NextFunction } from "express";

const experiencesRouter = Router();

experiencesRouter.get("/", async (req, res, next) => {
  try {
    const experiences = await experienceSchema.find();

    res.send(experiences);
  } catch (error) {
    console.log(error);

    next(error);
  }
});

experiencesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
//populate company and location

    const experience = await experienceSchema.findById(id).populate("company").populate("location");
      

    if (experience) {
      res.send(experience);
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
});

experiencesRouter.post("/", async (req, res, next) => {
  try {
    const newExperience = new experienceSchema(req.body);

    const { _id } = await newExperience.save();

    res.status(201).send(_id);
  } catch (error) {
    console.log(error);

    next(error);
  }
});

experiencesRouter.put("/:id", async (req, res, next) => {
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
});

export default experiencesRouter;
