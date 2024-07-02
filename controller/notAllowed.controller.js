import NotAllowed from "../model/notAllowed.model.js";

export const createNotAllowedController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    } 

    const existingNotAllowed = await NotAllowed.findOne({
      notAllowed_name: name,
    });
    
    if (existingNotAllowed) {
      return res.status(400).send({
        success: false,
        message: "NotAllowed already exist",
      });
    }
    const newNotAllowed = await NotAllowed({
      notAllowed_name: name, 
    }).save();
    
    const { _id, notAllowed_name } = newNotAllowed;

    res.status(201).send({
      success: true,
      message: "NotAllowed created successfully",
      notAllowed: { _id, notAllowed_name },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error - Error creating NotAllowed",
    });
  }
};

export const getNotAllowedsController = async (req, res) => {
  try {
    const notAlloweds = await NotAllowed.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: notAlloweds.length,
      message: "All NotAlloweds",
      notAlloweds,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting NotAlloweds",
    });
  }
};

export const updateNotAllowedController = async (req, res) => {
  try {
    const { _id, name } = req.body;

    const notAllowed = await NotAllowed.findById(_id);

    const updatedNotAllowed = await NotAllowed.findByIdAndUpdate(
      _id,
      {
        notAllowed_name: name || notAllowed.notAllowed_name,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "notAllowed Updated SUccessfully",
      updatedNotAllowed,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Update badge",
      error,
    });
  }
};

export const deleteNotAllowedController = async (req, res) => {
  try {
    const notAllowed = await NotAllowed.findOneAndDelete(req.body._id);

    if (!notAllowed) {
      throw new Error("notAllowed Not found");
    }

    res.status(200).send({
      success: true,
      message: "notAllowed Deleted Successfully",
      notAllowed,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
