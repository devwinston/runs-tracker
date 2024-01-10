import express from "express";

import {
  createRun,
  getRuns,
  getRun,
  deleteRun,
  updateRun,
} from "../controllers/runControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// authorisation middleware
router.use(protect);

// routes
router.route("/").post(createRun).get(getRuns);
router.route("/:id").get(getRun).delete(deleteRun).patch(updateRun);

export default router;
