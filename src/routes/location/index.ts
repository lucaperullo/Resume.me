//CRUD

import { Router } from "express";
import locationSchema from "./schema";
import { Request, Response, NextFunction } from "express";
import { internationalizer } from "../../utilities/internationalization";

const locationsRouter = Router();

locationsRouter.get("/", async (req, res, next) => {
  try {
    const locations = await locationSchema.find();
    res.send(locations);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

locationsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const location = await locationSchema.findById(id);
    if (location) {
      res.send(location);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

locationsRouter.post("/", internationalizer, async (req, res, next) => {
  try {
    const newLocation = new locationSchema(req.body);
    await newLocation.save();
    res.status(201).send({ message: "Created", newLocation: newLocation });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

locationsRouter.put("/:id", async (req, res, next) => {
  try {
    const location = await locationSchema.findByIdAndUpdate(
      req.params.id,
      req.body.location
    );
    if (location) {
      res.send("Ok");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

locationsRouter.delete("/:id", async (req, res, next) => {
  try {
    const location = await locationSchema.findByIdAndDelete(req.params.id);
    if (location) {
      res.send("Ok");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default locationsRouter;
