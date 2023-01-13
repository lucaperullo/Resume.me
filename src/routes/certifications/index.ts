// create a CRUD router for the certifications
import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import certificationsSchema from "./schema";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";

const certificationsRouter = Router();

// GET all certifications
certificationsRouter.get(
  "/",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const certifications = await certificationsSchema.find();
      res.send(certifications);
    } catch (error) {
      console.log(error);
    }
  }
);

// POST a new certification
certificationsRouter.post(
  "/",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCertification = new certificationsSchema(req.body);
      await newCertification.save();
      res.status(201).send({
        message: "Certification created",
        certification: newCertification,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// GET a certification by ID
certificationsRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const certification = await certificationsSchema
        .findById(id)
        .populate("user", "name surname");
      if (certification) {
        res.send(certification);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// PUT a certification by ID
certificationsRouter.put(
  "/:id",
  authorize,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const certification = await certificationsSchema.findByIdAndUpdate(
        req.params.id,
        req.body.certification
      );
      if (certification) {
        res.send("Ok");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// DELETE a certification by ID
certificationsRouter.delete(
  "/:id",
  authorize,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const certification = await certificationsSchema.findByIdAndDelete(
        req.params.id
      );
      if (certification) {
        res.send("Ok");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default certificationsRouter;
