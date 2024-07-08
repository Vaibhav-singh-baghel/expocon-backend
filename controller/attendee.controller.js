import { Parser } from "json2csv";
import Attendee from "../model/attendee.model.js";
import Badge from "../model/badge.model.js";
import Scan from "../model/scan.model.js";
import crypto from "crypto";
 
async function generateUnique6CharRegNumber() {
  let reg_number;
  let isUnique = false;

  while (!isUnique) { 
    const alphabets = crypto.randomBytes(3).toString('hex').replace(/[^a-zA-Z]/g, '').substring(0, 3);
    
    if (alphabets.length < 3) {
      continue;
    }

    const digits = (Math.floor(100 + Math.random() * 900)).toString();
    reg_number = alphabets + digits;
    const existingAttendee = await Attendee.findOne({ reg_number });

    if (!existingAttendee) {
      isUnique = true;
    }
  }

  return reg_number;
}

export const createAttendeeController = async (req, res) => {
  try {
    let { reg_number } = req.body;

    const { 
      name,
      place,
      mobile,
      email,
      badge,
      reference,
      company,
      designation,
      state,
      country,
      how_us,
      notAllowed,
      badge_printed,
      badge_print_dt,
      badge_printed_by,
      certificate_print_dt,
      certificate_printed,
      certificate_printed_by,
      user_id,
      enteredIn,
    } = req.body;
 
    if (!reg_number) {
      reg_number = await generateUnique6CharRegNumber();
    }
 
    if (!name || !email) {
      return res.status(400).send({
        success: false,
        message: "Name and email are required"
      });
    }
 
    const newAttendee = new Attendee({
      reg_number,
      name,
      place,
      mobile,
      company,
      email,
      badge,
      reference,
      designation,
      state,
      country,
      how_us,
      notAllowed,
      badge_printed,
      badge_print_dt,
      badge_printed_by,
      certificate_printed_by,
      certificate_printed,
      certificate_print_dt,
      user_id,
      enteredIn,
    });
 
    await newAttendee.save();

    res.status(201).send({
      success: true,
      message: "Attendee created successfully",
      attendee: newAttendee,
    });

  } catch (error) {
    console.error("Error creating attendee:", error.message);
    res.status(500).send({
      success: false,
      message: "Internal Server Error - Error creating attendee",
    });
  }
};




export const getAttendeeController = async (req, res) => {
  try {
    const { searchQuery } = req.body;
    let query = {};

    if (searchQuery) {
      const escapedSearchQuery = searchQuery.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      query = {
        $or: [
          { name: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { email: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { place: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { company: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { designation: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { reg_number: { $regex: new RegExp(escapedSearchQuery, "i") } },
        ],
      };
    } else {
      // Handle the case where no searchQuery is provided
      res.status(200).send({
        success: true,
        TotalCount: 0,
        message: "No attendees found as no search query provided",
        attendees: [],
      });
      return;
    }

    const attendees = await Attendee.find(query)
      .populate({ path: "badge", model: Badge })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: attendees.length,
      message: "All Attendee",
      attendees,
    });
  } catch (error) {
    console.error("Error in getting attendees:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting attendees",
    });
  }
};

export const updateAttendeeController = async (req, res) => {
  console.log(req.body);
  try {
    const {
      reg_number,
      name,
      place,
      mobile,
      email,
      badge,
      reference,
      company,
      designation,
      state,
      country,
      how_us,
      notAllowed,
      badge_printed,
      badge_print_dt,
      badge_printed_by,
      certificate_printed_by,
      certificate_printed,
      certificate_print_dt,
      user_id,
      enteredIn,
    } = req.body;

    const attendee = await Attendee.findOne({ reg_number });

    const updatedAttendee = await Attendee.findOneAndUpdate(
      { reg_number },
      {
        reg_number: reg_number || attendee.reg_number,
        name: name || attendee.name,
        place: place || attendee.place,
        mobile: mobile || attendee.mobile,
        email: email || attendee.email,
        badge: badge || attendee.badge,
        reference: reference || attendee.reference,
        company: company || attendee.company,
        designation: designation || attendee.designation,
        state: state || attendee.state,
        country: country || attendee.country,
        how_us: how_us || attendee.how_us,
        notAllowed: notAllowed || attendee.notAllowed,
        badge_printed: badge_printed || attendee.badge_printed,
        badge_print_dt: badge_print_dt || attendee.badge_print_dt,
        badge_printed_by: badge_printed_by || attendee.badge_printed_by,
        certificate_printed_by:
          certificate_printed_by || attendee.certificate_printed_by,
        certificate_printed:
          certificate_printed || attendee.certificate_printed,
        certificate_print_dt:
          certificate_print_dt || attendee.certificate_print_dt,
        user_id: user_id || attendee.user_id,
        enteredIn: enteredIn || attendee.enteredIn,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Attendee Updated SUccessfully",
      updatedAttendee,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating Attendee",
      error,
    });
  }
};

export const deleteAttendeeController = async (req, res) => {
  try {
    const attendee = await Attendee.findOneAndDelete(req.body._id);

    if (!attendee) {
      throw new Error("badge Not found");
    }

    res.status(200).send({
      success: true,
      message: "Attendee Deleted Successfully",
      attendee,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const isAttendeeAllowed = async (req, res) => {
  const { reg_number, scan_id, scanType } = req.body;
  console.log(reg_number, scan_id, scanType);
  try {
    const user = await Attendee.findOne({ reg_number });
    const scan = await Scan.findOne({ scan_id });
    console.log('user', user);
    console.log('scan', scan);
    if (!user || !scan) {
      return res.send({
        success: false,
        message: "Attendee or Scan not found",
      });
    }

    if (user.notAllowed.includes(scan_id)) {
      return res.send({
        success: false,
        message: "Not allowed",
      });
    }

    if (
      scanType === "single" &&
      user.enteredIn.some((item) => item.scanId === scan_id)
    ) {
      return res.send({
        success: false,
        message: "Allowed only once",
      });
    }
    if (
      scanType === "multi" &&
      user.enteredIn.some((item) => item.scanId === scan_id)
    ) {
      return res.status(200).send({
        success: true,
        message: "Attendee is allowed",
      });
    }

    user.enteredIn.push({ scanId:scan_id });
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Attendee is allowed",
    });
  } catch (error) {
    console.error("Error processing attendee:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while processing the request",
    });
  }
};

export const exportAttendeesController = async (req, res) => {
  try {
    const attendees = await Attendee.find().populate(
      "badge state country how_us notAllowed badge_printed_by certificate_printed_by enteredIn.scanId"
    );

    const fields = [
      "reg_number",
      "name",
      "place",
      "mobile",
      "email",
      "company",
      "badge",
      "reference",
      "designation",
      "state",
      "country",
      "how_us",
      "notAllowed",
      "badge_printed",
      "badge_print_dt",
      "badge_printed_by",
      "certificate_printed_by",
      "certificate_printed",
      "certificate_print_dt",
      "enteredIn",
    ];

    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(attendees);

    res.header("Content-Type", "text/csv");
    res.attachment("attendees.csv");
    return res.send(csv);
  } catch (error) {
    console.error("Error exporting attendees:", error);
    res.status(500).json({ error: "Server error" });
  }
};
