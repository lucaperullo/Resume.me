// CURD
import { Router } from "express";
import companySchema from "./schema";
import { Request, Response, NextFunction } from "express";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";

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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCompany = new companySchema(req.body);
      await newCompany.save();
      res.status(201).send({
        message: "Company created",
        company: newCompany,
      });
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
