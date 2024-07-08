import fs from "fs";
import Event from "../model/event.model.js";

export const createEventController = async (req, res) => {
  try {
    const { badge_setup } = req.fields;
    const { header_graphics } = req.files;

    if (!header_graphics || !badge_setup) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const event = new Event({ badge_setup });

    event.header_graphics.data = fs.readFileSync(header_graphics.path);
    event.header_graphics.contentType = header_graphics.type;

    await event.save();

    res.status(201).send({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.send({
      success: false,
      message: "Internal Server Error - Error creating event",
    });
  }
};

export const getLatestBanner = async (req, res) => {
  console.log("first");
  try {
    const latestEvent = await Event.findOne()
      .sort({ createdAt: -1 })
      .select("header_graphics");
    console.log(latestEvent);
    if (
      !latestEvent ||
      !latestEvent.header_graphics ||
      !latestEvent.header_graphics.data
    ) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-type", latestEvent.header_graphics.contentType);
    return res.status(200).send(latestEvent.header_graphics.data);
  } catch (error) {
    console.error("Error fetching latest banner:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

export const getBadgeController = async (req, res) => {
  try {

    const events = await Event.find({}).sort({ createdAt: -1 });
    
    const badge = events[0].badge_setup

    res.status(200).send({
      success: true,
      TotalCount: events.length,
      message: "All events",
      badge,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting events",
    });
  }
};

export const getEventsController = async (req, res) => {
  try {

    console.log("firsttttt")
    const events = await Event.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: events.length,
      message: "All events",
      events,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting events",
    });
  }
};

export const updateEventController = async (req, res) => {
  try {
    const { badge_setup } = req.fields;
    const { header_graphics } = req.files; 

    const event = await Event.findById(req.params.eid);

    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event not found",
      });
    }

    const updates = {};

    if (badge_setup) {
      updates.badge_setup = JSON.parse(badge_setup); 
    }

    if (header_graphics) {
      updates.header_graphics = {
        data: fs.readFileSync(header_graphics.path),
        contentType: header_graphics.type,
      };
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eid,
      updates,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error while updating event",
      error,
    });
  }
};

export const deleteEventController = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete(req.body._id);

    if (!event) {
      throw new Error("event Not found");
    }

    res.status(200).send({
      success: true,
      message: "event Deleted Successfully",
      event,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
