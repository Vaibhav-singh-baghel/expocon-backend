import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
    marginTop:{
        type: String,
    },
    marginBottom:{
        type: String,
    },
    marginLeft:{
        type: String,
    },
    marginRight:{
        type: String,
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