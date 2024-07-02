import State from "../model/state.model.js";

export const createStateController = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingState = await State.findOne({ state_name: name });
    if (existingState) {
      return res.status(400).send({
        success: false,
        message: "States already exist",
      });
    }
    const newState = await State({
      state_name: name,
      state_status: status,
    }).save();

    const { _id, state_status, state_name } = newState;

    res.status(201).send({
      success: true,
      message: "state created successfully",
      state: { _id, state_name, state_status },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error - Error creating state",
    });
  }
};

export const getStatesController = async (req, res) => {
  try {
    const states = await State.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: states.length,
      message: "All States",
      states,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting states",
    });
  }
};

export const updateStateController = async (req, res) => {
  try {
    const { _id, name, status } = req.body;

    const state = await State.findById(_id);

    const updatedState = await State.findByIdAndUpdate(
      _id,
      {
        state_name: name || state.state_name,
        state_status: status || state.state_status,
      },
      { new: true }
    );


    res.status(200).send({
      success: true,
      message: "state Updated SUccessfully",
      updatedState,
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Update state",
      error,
    });
  }
};

export const deleteStateController = async (req, res) => {
  try {
    const state = await State.findOneAndDelete(req.body._id);

    if (!state) {
      throw new Error("state Not found");
    }

    res.status(200).send({
      success: true,
      message: "state Deleted Successfully",
      state,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
