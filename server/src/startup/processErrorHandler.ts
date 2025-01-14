import logger from "../logger";
import db from "../models";

export const initProcessErrorHandler = () => {
  process.on("uncaughtException", async (_ex) => {
    try {
      await db.Logs.create({
        level: "error",
        message: "Uncaught exception",
        meta: { project: "primaryService" },
      });
      logger.error({ message: "Uncaught exception" });
      process.exit(1);
    } catch (err) {
      process.exit(1);
    }
  });

  process.on("unhandledRejection", async (_ex) => {
    try {
      await db.Logs.create({
        level: "error",
        message: "Uncaught rejection.",
        meta: { project: "primaryService" },
      });
      logger.error({ message: "Unhandled Rejection" });
      process.exit(1);
    } catch (err) {
      process.exit(1);
    }
  });
};
