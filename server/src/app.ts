import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { passportAuthInit } from "./auth";
import { errorMiddleware } from "./middleware";
import { combineRouter } from "./routes";
import { initCronJobs } from "./startup/cronJobs";
import { initProcessErrorHandler } from "./startup/processErrorHandler";
import { initSeedData } from "./startup/seedData";
// import { resetMainDemoUser } from "./utils/dbUtils/routineMaintenance";
// import { seedMigrator } from "./utils";

const app = express();

// Startup
app.use(helmet());
initProcessErrorHandler();
initCronJobs();
initSeedData();
passportAuthInit();
app.use(passport.initialize());
// resetMainDemoUser();

// Morgan
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

// Cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
combineRouter(app);

// Err Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/*
 * **************  MISC REF *********************
 */

// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// });

// Seed Database
// seedMigrator();
