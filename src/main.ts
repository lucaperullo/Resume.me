import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import cookieParser from "cookie-parser";

import usersRouter from "./routes/user";
import skillsRouter from "./routes/skills";
import aboutRouter from "./routes/about";
import certificationsRouter from "./routes/certifications";
import companiesRouter from "./routes/companies";
import experiencesRouter from "./routes/experiences";
import locationsRouter from "./routes/location";
import metadataRouter from "./routes/metadata";
import projectsRouter from "./routes/projects";
import path from "path";
// import { fileURLToPath } from 'url';

// import path,{ dirname } from "path";
const dotenv = require("dotenv");
// create corsOptions with origin filter 
const whitelist = ["http://localhost:3000/","*", null]
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();

const port = process.env.PORT || 2023;

app.use(express.json());

app.use(cookieParser());
app.use(usersRouter);
app.use("/skills", skillsRouter);
app.use("/about", aboutRouter);
app.use("/certifications", certificationsRouter);
app.use("/companies", companiesRouter);
app.use("/experience", experiencesRouter);
app.use("/locations", locationsRouter);
app.use("/medadata", metadataRouter)
app.use("/projects", projectsRouter)

app.get("/",(req:Request, res:Response) => {

  res.sendFile(path.join(__dirname, "/public/index.html"));
});
const connectToDatabase = async (app: any) => {
  try {
    await dotenv.config();
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.table(listEndpoints(app));
      console.log(
        "\x1b[36m%s\x1b[0m",
        `Server is having tough time running away from ${port} angry monkeys`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

connectToDatabase(app);
