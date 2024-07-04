import mongoose from "mongoose";

const enteredInSchema = new mongoose.Schema({
  scanId: {
    type: String
  },
  enteredAt: {
    type: Date,
    default: Date.now,
  },
});

const attendeeSchema = new mongoose.Schema(
  {
    reg_number: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    badge: {
      type: mongoose.ObjectId,
      ref: "Badge",
    },
    reference: {
      type: String,
    },
    designation: {
      type: String,
    },
    state: {
      type: mongoose.ObjectId,
      ref: "State",
    },
    country: {
      type: mongoose.ObjectId,
      ref: "Country",
    },
    how_us: {
      type: mongoose.ObjectId,
      ref: "HowUs",
    },
    notAllowed: [
      {
        type: String,
      },
    ],
    badge_printed: {
      type: Boolean,
      default: false,
    },
    badge_print_dt: {
      type: Date,
    },
    badge_printed_by: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    certificate_printed_by: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    certificate_printed: {
      type: Boolean,
      default: false,
    },
    certificate_print_dt: {
      type: Date,
    },
    enteredIn: [enteredInSchema],
  },
  { timestamps: true }
);

const Attendee = mongoose.model("Attendee", attendeeSchema);

export default Attendee;
