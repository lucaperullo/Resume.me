import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import UserSchema from "./schema";
import { authenticate, refresh } from "../../utilities/auth";
import { authorize } from "../../utilities/auth/middleware";

const usersRouter = Router();

usersRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = new UserSchema(req.body);
      await newUser.save();
      res.status(201).send({ message: "User created", user: newUser });
    } catch (error) {
      console.log(error);
    }
  }
);

usersRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await (UserSchema as any).findByCredentials(email, password);
      console.log(user);
      if (user) {
        const tokens = await authenticate(user);
        res.cookie("accessToken", tokens.token, {
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        res
          .cookie("refreshToken", tokens.refreshToken, {
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
          })
          .status(200)
          .send({ message: "login successful", user });
      } else {
        res.status(404).send({ message: "login failed" });
      }
    } catch (error) {
      res.send({ message: error });
      next(error);
    }
  }
);

// logout to clean the cookies
usersRouter.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .clearCookie("accessToken", {
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        })
        .clearCookie("refreshToken", {
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        })
        .status(200)
        .send({ message: "logout successful" });
    } catch (error) {
      res.send({ message: error });
      next(error);
    }
  }
);

// tested
usersRouter.get(
  "/refreshToken",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const oldRefreshToken = req.cookies.refreshToken;
      const newTokens: any = await refresh(oldRefreshToken);
      res.cookie("token", newTokens.token, {
        httpOnly: true,
      });
      res
        .cookie("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
          path: "/api/users/refreshToken",
        })
        .send("ok");
    } catch (error) {
      next(error);
    }
  }
);
// tested
usersRouter.get(
  "/me",
  authorize,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      let user = await UserSchema.findById(req.user._id)
        .populate("about")
        .populate("certifications");
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);
export default usersRouter;
