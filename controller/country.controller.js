import Country from "../model/country.model.js";

export const createCountryController = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingCountry = await Country.findOne({ country_name: name });
    if (existingCountry) {
      return res.status(400).send({
        success: false,
        message: "Country already exist",
      });
    }
    const newCountry = await Country({
      country_name: name,
      country_status: status,
    }).save();

    const { _id, country_status, country_name } = newCountry;

    res.status(201).send({
      success: true,
      message: "country created successfully",
      country: { _id, country_name, country_status },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error - Error creating country",
    });
  }
};

export const getCountriesController = async (req, res) => {
  try {
    const countries = await Country.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: countries.length,
      message: "All Countries",
      countries,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting countries",
    });
  }
};

export const updateCountryController = async (req, res) => {
  try {
    const { _id, name, status } = req.body;

    const country = await Country.findById(_id);

    const updatedCountry = await Country.findByIdAndUpdate(
      _id,
      {
        country_name: name || country.country_name,
        country_status: status || country.country_status,
      },
      { new: true }
    );


    res.status(200).send({
      success: true,
      message: "country Updated SUccessfully",
      updatedCountry,
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Update country",
      error,
    });
  }
};

export const deleteCountryController = async (req, res) => {
  try {
    const country = await Country.findOneAndDelete(req.body._id);

    if (!country) {
      throw new Error("country Not found");
    }

    res.status(200).send({
      success: true,
      message: "country Deleted Successfully",
      country,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
