import mongoose from "mongoose";

const timeSchema = new mongoose.Schema(
  {
    minutes: { type: Number, required: true },
    seconds: { type: Number, required: true },
  },
  { _id: false }
);

const runSchema = new mongoose.Schema(
  {
    distance: { type: Number, required: true },
    duration: timeSchema,
    pace: timeSchema,
    temperature: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  { timestamps: true }
);

const Run = mongoose.model("Run", runSchema);

export default Run;
