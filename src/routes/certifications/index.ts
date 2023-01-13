// create a CRUD router for the certifications
import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import certificationsSchema from "./schema";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";

const certificationsRouter = Router();

// GET all certifications
certificationsRouter.get(
  "/certifications",
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
  "/certifications",
  authorize,

  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCertification = new certificationsSchema(req.body);
      await newCertification.save();
      res.status(201).send({
        message: "Certification created",
        certification: { ...newCertification },
      });
    } catch (error) {
      console.log(error);
    }
  }
);
