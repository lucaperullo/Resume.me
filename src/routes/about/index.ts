// implement crud operations for about

import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import aboutSchema from "./schema";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";
import UserSchema from "../user/schema";

const aboutRouter = Router();

// GET all about
aboutRouter.get("/", async (req: any, res: Response, next: NextFunction) => {
  try {
    const about = await aboutSchema.find();
    res.send(about);
  } catch (error) {
    console.log(error);
  }
});

// POST a new about
aboutRouter.post(
  "/",
  authorize,
  internationalizer,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      let userId = req.user._id;
      const newAbout = new aboutSchema({
        ...req.body,
        userId,
      });
      await newAbout.save();

      const user = await UserSchema.findByIdAndUpdate(userId, {
        $push: { about: newAbout._id },
      });
      if (user) {
        user.save();
        res.status(201).send({
          message: "About created",
          about: newAbout,
        });
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT a new about
aboutRouter.put(
  "/:id",
  authorize,
  internationalizer,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      let userId = req.user._id;
      const about = await aboutSchema.findByIdAndUpdate(req.body, userId);
      if (about) {
        res.send({ message: "About updated", about });
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// delete a new about
aboutRouter.delete(
  "/delete/:id",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const about = await aboutSchema.findByIdAndDelete(req.params.id);
      if (about) {
        res.send("Deleted");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default aboutRouter;
