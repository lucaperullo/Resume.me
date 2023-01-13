import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import cookieParser from "cookie-parser";
import config from "./config/config";
import usersRouter from "./routes/user";
import skillsRouter from "./routes/skills";
import aboutRouter from "./routes/about";
import certification from "./routes/certifications";

const app = express();

const port = config.PORT || 2023;

app.use(express.json());

app.use(cookieParser());
app.use(usersRouter);
app.use("/skills", skillsRouter);

const connectToDatabase = async (app: any) => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(config.MONGO_URI!);
    app.listen(port, () => {
      console.table(listEndpoints(app));
      console.log(`Server is flying on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

connectToDatabase(app);
