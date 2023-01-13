import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import SkillSchema from "./schema";
import { authorize } from "../../utilities/auth/middleware";
import { internationalizer } from "../../utilities/internationalization";

const skillsRouter = Router();

// GET all skills
skillsRouter.get("/", async (req: any, res: Response, next: NextFunction) => {
  try {
    const skills = await SkillSchema.find();
    res.send(skills);
  } catch (error) {
    console.log(error);
  }
});

// POST a new skill
skillsRouter.post(
  "/",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSkill = new SkillSchema(req.body);
      await newSkill.save();
      res
        .status(201)
        .send({ message: "Skill created", skill: { ...newSkill } });
    } catch (error) {
      console.log(error);
    }
  }
);

// PUT a new skill
skillsRouter.put(
  "/:id",
  authorize,
  internationalizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skill = await SkillSchema.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (skill) {
        res.send("Modified");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// delete a new skill
skillsRouter.delete(
  "/:id",
  authorize,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skill = await SkillSchema.findByIdAndDelete(req.params.id);
      if (skill) {
        res.send("Deleted");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default skillsRouter;
