// create a CRUD router for the metadata
import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import metadataSchema from "./schema";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";

const metadataRouter = Router();

// GET all metadata
metadataRouter.get("/", async (req: any, res: Response, next: NextFunction) => {
  try {
    const metadata = await metadataSchema.find();
    res.send(metadata);
  } catch (error) {
    console.log(error);
  }
});

// POST a new metadata
metadataRouter.post(
  "/",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMetadata = new metadataSchema(req.body);
      await newMetadata.save();
      res.status(201).send({
        message: "Metadata created",
        metadata: newMetadata,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT a new metadata
metadataRouter.put(
  "/:id",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const metadata = await metadataSchema.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (metadata) {
        res.send("Modified");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// DELETE a metadata
metadataRouter.delete(
  "/:id",
  authorize,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const metadata = await metadataSchema.findByIdAndDelete(req.params.id);
      if (metadata) {
        res.send("Deleted");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default metadataRouter;
