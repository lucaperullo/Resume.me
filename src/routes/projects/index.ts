import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import projectSchema from "./schema";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";

const projectsRouter = Router();

// Generate CRUD for projects (GET, POST, PUT, DELETE)

// GET all projects
projectsRouter.get("/", async (req: any, res: Response, next: NextFunction) => {
  try {
    const projects = await projectSchema.find();
    res.send(projects);
  } catch (error) {
    console.log(error);
  }
});

// GET a project by id user
projectsRouter.get(
  "/:userId",
  authorize,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const projects = await projectSchema.find({ user: req.params.id });
      res.send(projects);
    } catch (error) {
      console.log(error);
    }
  }
);

// POST a new project
projectsRouter.post(
  "/:userId",
  authorize,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProject = new projectSchema(req.body);
      const { _id } = await newProject.save();
      res.status(201).send(_id);
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT a new project
projectsRouter.put(
  "/:userId",
  authorize,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectSchema.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (project) {
        res.send("Edited");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// DELETE a project
projectsRouter.delete(
  "/:userId",
  authorize,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectSchema.findByIdAndDelete(req.params.id);
      if (project) {
        res.send("Deleted");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default projectsRouter;