import Attendee from "../model/attendee.model.js";
import Badge from "../model/badge.model.js";

import { v4 as uuidv4 } from "uuid";
import Scan from "../model/scan.model.js";

export const createAttendeeController = async (req, res) => {
  console.log(req.body);
  try {
    const reg_number = uuidv4();
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

    if (!reg_number || !name || !email) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingAttendee = await Attendee.findOne({ reg_number });
    if (existingAttendee) {
      return res.status(400).send({
        success: false,
        message: "Attendee already exists",
      });
    }

    const newAttendee = await new Attendee({
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
    }).save();

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

// export const getAttendeeController = async (req, res) => {
//   try {
//     const { searchQuery } = req.body;
//     const query = {};
//     const escapedSearchQuery = searchQuery?.replace(
//       /[.*+?^${}()|[\]\\]/g,
//       "\\$&"
//     );

//     if (escapedSearchQuery) {
//       query.$or = [
//         { name: { $regex: new RegExp(escapedSearchQuery, "i") } },
//         { email: { $regex: new RegExp(escapedSearchQuery, "i") } },
//         { place: { $regex: new RegExp(escapedSearchQuery, "i") } },
//         { company: { $regex: new RegExp(escapedSearchQuery, "i") } },
//         { designation: { $regex: new RegExp(escapedSearchQuery, "i") } },
//         { reg_number: { $regex: new RegExp(escapedSearchQuery, "i") } },
//       ];
//     }

//     const attendees = await Attendee.find(query)
//       .populate({ path: "badge", model: Badge })
//       .sort({ createdAt: -1 });

//     res.status(200).send({
//       success: true,
//       TotalCount: attendees.length,
//       message: "All Attendee",
//       attendees,
//     });
//   } catch (error) {
//     console.error("Error in getting attendees:", error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in getting attendees",
//     });
//   }
// };

export const getAttendeeController = async (req, res) => {
  try {
    const { searchQuery } = req.body;
    let query = {};

    if (searchQuery) {
      const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      query = {
        $or: [
          { name: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { email: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { place: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { company: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { designation: { $regex: new RegExp(escapedSearchQuery, "i") } },
          { reg_number: { $regex: new RegExp(escapedSearchQuery, "i") } }
        ]
      };
    } else {
      // Handle the case where no searchQuery is provided
      res.status(200).send({
        success: true,
        TotalCount: 0,
        message: "No attendees found as no search query provided",
        attendees: []
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
  const { reg_number, scanId, scanType } = req.body;

  try {
    const user = await Attendee.findOne({ reg_number });
    const scan = await Scan.findById(scanId);

    if (!user || !scan) {
      return res.send({
        success: false,
        message: "Attendee or Scan not found",
      });
    }

    if (user.notAllowed.includes(scanId)) {
      return res.send({
        success: false,
        message: "Not allowed",
      });
    }

    if (scanType === "single" && user.enteredIn.some(item => item.scanId.toString() === scanId)) {
      return res.send({
        success: false,
        message: "Allowed only once",
      });
    }

    user.enteredIn.push({ scanId });
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