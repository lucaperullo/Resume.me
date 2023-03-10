// CURD
import { Router } from "express";
import companySchema from "./schema";
import { Request, Response, NextFunction } from "express";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";
import UserSchema from "../user/schema";

const companiesRouter = Router();

// GET all companies
companiesRouter.get(
  "/",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const companies = await companySchema.find();
      res.send(companies);
    } catch (error) {
      console.log(error);
    }
  }
);

// POST a new company
companiesRouter.post(
  "/",
  authorize,
  internationalizer,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      let userId = req.user._id;
      const newCompany = new companySchema({
        ...req.body,
        userId,
      });
      await newCompany.save();

      const user = await UserSchema.findByIdAndUpdate(userId, {
        $push: { companies: newCompany._id },
      });

      if (user) {
        await user.save();
        res.status(201).send({
          message: "Company created",
          company: newCompany,
        });
      } else {
        res.status(404).send({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT a company by ID
companiesRouter.put(
  "/:id",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const company = await companySchema.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
      });
      if (company) {
        res.send(company);
      } else {
        const error: any = new Error(`Company with id ${id} not found!`);
        error.httpStatusCode = 404;
        next(error);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// DELETE a company by ID
companiesRouter.delete(
  "/:id",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const company = await companySchema.findByIdAndDelete(id);
      if (company) {
        res.send("Deleted");
      } else {
        const error: any = new Error(`Company with id ${id} not found!`);
        error.httpStatusCode = 404;
        next(error);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default companiesRouter;
