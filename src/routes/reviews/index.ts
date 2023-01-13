// create a CRUD router for reviews
import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import reviewSchema from "./schema";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";

const reviewRouter = Router();

// GET all reviews
reviewRouter.get("/", async (req: any, res: Response, next: NextFunction) => {
  try {
    const reviews = await reviewSchema.find();
    res.send(reviews);
  } catch (error) {
    console.log(error);
  }
});

// POST a new review
reviewRouter.post(
  "/",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReview = new reviewSchema(req.body);
      await newReview.save();
      res
        .status(201)
        .send({ message: "Review created", review: { ...newReview } });
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT a new review
reviewRouter.put(
  "/:id",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await reviewSchema.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      if (review) {
        res.send("Modified");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// DELETE a review
reviewRouter.delete(
  "/:id",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await reviewSchema.findByIdAndDelete(req.params.id);
      if (review) {
        res.send("Deleted");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default reviewRouter;
