import mongoose from "mongoose";

import Run from "../models/runModel.js";

// create new run
const createRun = async (req, res) => {
  const { distance, minutes, seconds, temperature, weight } = req.body;

  const duration = { minutes, seconds };
  const paceMinutes = Math.floor((minutes + seconds / 60) / distance);
  const paceSeconds = ((minutes + seconds / 60) / distance - paceMinutes) * 60;
  const pace = { minutes: paceMinutes, seconds: paceSeconds };

  try {
    const _uid = req.user._id;

    const run = await Run.create({
      distance,
      duration,
      pace,
      temperature,
      weight,
      _uid,
    });

    res.status(200).json(run);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all runs
const getRuns = async (req, res) => {
  const _uid = req.user._id;

  const runs = await Run.find({ _uid }).sort({ createdAt: -1 }); // descending sort

  res.status(200).json(runs);
};

// get specific run
const getRun = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Run not found" });
  }

  const run = await Run.findById(id);

  if (!run) {
    return res.status(404).json({ error: "Run not found" });
  }

  res.status(200).json(run);
};

// delete specific run
const deleteRun = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Run not found" });
  }

  const run = await Run.findOneAndDelete({ _id: id }); // returns deleted run

  if (!run) {
    return res.status(404).json({ error: "Run not found" });
  }

  res.status(200).json(run);
};

// update specific run
const updateRun = async (req, res) => {
  const { id } = req.params;
  const { distance, minutes, seconds, temperature, weight } = req.body;

  const duration = { minutes, seconds };
  const paceMinutes = Math.floor((minutes + seconds / 60) / distance);
  const paceSeconds = ((minutes + seconds / 60) / distance - paceMinutes) * 60;
  const pace = { minutes: paceMinutes, seconds: paceSeconds };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Run not found" });
  }

  const run = await Run.findOneAndUpdate(
    { _id: id },
    {
      distance,
      duration,
      pace,
      temperature,
      weight,
    },
    {
      returnDocument: "after",
    }
  ); // returns updated run

  if (!run) {
    return res.status(404).json({ error: "Run not found" });
  }

  res.status(200).json(run);
};

export { createRun, getRuns, getRun, deleteRun, updateRun };
