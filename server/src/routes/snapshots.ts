import express from "express";
import { requireJwt } from "../auth";
import db from "../models";
import { UserAttributes as User } from "../models/users";
const { Op } = require("sequelize");

const router = express.Router();

/*
 * Inputs: None
 * Outputs: Provides all data related to the most recently submitted snapshot (just one),
 * including all its subtables (accounts, holdings) as json
 *
 * Snapshot = {
 *    Accounts: [{
 *          Holdings: [{}]
 *    }]
 * }
 */
router.get("/latest", requireJwt, async (req, res) => {
  const { id } = req.user as User;
  const snapshot = await db.Snapshots.findOne({
    where: { userId: id },
    include: {
      model: db.Accounts,
      include: {
        model: db.Holdings,
      },
    },
    order: [["specifiedDate", "DESC"]],
    limit: 1,
  });
  res.json(snapshot);
});

/*
 * Inputs: Number of years prior to current date
 * Outputs: Outputs a list of all the snapshots (multiple) that fall within the date range of now
 * minus the number of input years as json.  Does not include accounts/holdings info.
 *
 * Snapshots = [ {}, {}, {} ] where {} = snapshot
 */
router.get("/range/:years", requireJwt, async (req, res) => {
  const { id } = req.user as User;
  const { years } = req.params;
  let startDate = new Date();

  startDate.setMonth(new Date().getMonth() - parseInt(years) * 12);

  const snapshots = await db.Snapshots.findAll({
    where: {
      userId: id,
      specifiedDate: { [Op.gte]: startDate },
    },
    order: [["specifiedDate", "DESC"]],
  });

  res.json(snapshots);
});

export default router;
