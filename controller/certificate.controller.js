import Certificate from "../model/certificate.model.js";

export const createCertificateController = async (req, res) => {
  try {
    const { category, status } = req.body;

    if (!category) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingCertificate = await Certificate.findOne({
      certificate_category: category,
    });
    if (existingCertificate) {
      return res.status(400).send({
        success: false,
        message: "Certificate already exist",
      });
    }
    const newCertificate = await Certificate({
      certificate_category: category,
      certificate_status: status,
    }).save();
    
    const { _id, certificate_status, certificate_category } = newCertificate;

    res.status(201).send({
      success: true,
      message: "Certificate created successfully",
      badge: { _id, certificate_category, certificate_status },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error - Error creating Certificate",
    });
  }
};

export const getCertificatesController = async (req, res) => {
  try {
    const certificates = await Certificate.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: certificates.length,
      message: "All Certificates",
      certificates,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting Certificates",
    });
  }
};

export const updateCertificateController = async (req, res) => {
  try {
    const { _id, category, status } = req.body;
    console.log(category, _id)
    const certificate = await Certificate.findById(_id);

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      _id,
      {
        certificate_category: category || certificate.certificate_category,
        certificate_status: status || certificate.certificate_status,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "certificate Updated SUccessfully",
      updatedCertificate,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Update badge",
      error,
    });
  }
};

export const deleteCertificateController = async (req, res) => {
  try {
    const certificate = await Certificate.findOneAndDelete(req.body._id);

    if (!certificate) {
      throw new Error("certificate Not found");
    }

    res.status(200).send({
      success: true,
      message: "certificate Deleted Successfully",
      certificate,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
