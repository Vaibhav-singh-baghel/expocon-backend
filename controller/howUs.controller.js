import HowUs from "../model/howUs.model.js";

export const createHowUsController = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingHowUs = await HowUs.findOne({ howUs_name: name });
    if (existingHowUs) {
      return res.status(400).send({
        success: false,
        message: "HowUs already exist",
      });
    }
    const newHowUs = await HowUs({
      howUs_name: name,
      howUs_status: status,
    }).save();

    const { _id, howUs_status, howUs_name } = newHowUs;

    res.status(201).send({
      success: true,
      message: "howUs created successfully",
      howUs: { _id, howUs_name, howUs_status },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error - Error creating howUs",
    });
  }
};

export const getHowUsesController = async (req, res) => {
  try {
    const howUses = await HowUs.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: howUses.length,
      message: "All HowUses",
      howUses,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting howus",
    });
  }
};

export const updateHowUsController = async (req, res) => {
  try {
    const { _id, name, status } = req.body;

    const howUs = await HowUs.findById(_id);

    const updatedHowUs = await HowUs.findByIdAndUpdate(
      _id,
      {
        howUs_name: name || howUs.howUs_name,
        howUs_status: status || howUs.howUs_status,
      },
      { new: true }
    );


    res.status(200).send({
      success: true,
      message: "howUs Updated SUccessfully",
      updatedHowUs,
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Update howUs",
      error,
    });
  }
};

export const deleteHowUsController = async (req, res) => {
  try {
    const howUs = await HowUs.findOneAndDelete(req.body._id);

    if (!howUs) {
      throw new Error("howUs Not found");
    }

    res.status(200).send({
      success: true,
      message: "howUs Deleted Successfully",
      howUs,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
