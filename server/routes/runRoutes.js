import express from "express";

import {
  createRun,
  getRuns,
  getRun,
  deleteRun,
  updateRun,
} from "../controllers/runControllers.js";

const router = express.Router();

router.route("/").post(createRun).get(getRuns);

router.route("/:id").get(getRun).delete(deleteRun).patch(updateRun);

export default router;
