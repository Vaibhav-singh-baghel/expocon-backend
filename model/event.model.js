import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
    marginTop:{
        type: Number,
    },
    marginBottom:{
        type: Number,
    },
    marginLeft:{
        type: Number,
    },
    marginRight:{
        type: Number,
    },
});

const eventSchema = new mongoose.Schema(
  {
    header_graphics: {
      data: Buffer,
      contentType: String,
    },
    badge_setup: badgeSchema
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;