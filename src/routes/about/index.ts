// implement crud operations for about

import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import aboutSchema from "./schema";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";

const aboutRouter = Router();

// GET all about
aboutRouter.get(
  "/:userId",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const about = await aboutSchema.find();
      res.send(about);
    } catch (error) {
      console.log(error);
    }
  }
);

// POST a new about
aboutRouter.post(
  "/",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newAbout = new aboutSchema(req.body);
      await newAbout.save();
      res.status(201).send({
        message: "About created",
        about: newAbout,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT a new about
aboutRouter.put(
  "/about/:id",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const about = await aboutSchema.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (about) {
        res.send("Modified");
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
  "/about/:id",
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
