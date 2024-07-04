import Scan from "../model/scan.model.js";

async function generateUnique4DigitBadgeID() {
  let scan_id;
  let isUnique = false;

  while (!isUnique) {
    scan_id = Math.floor(1000 + Math.random() * 9000);
    const existingScan = await Scan.findOne({ scan_id });

    if (!existingScan) {
      isUnique = true;
    }
  }

  return scan_id;
}

export const createScanController = async (req, res) => {
  try {
    const { category, status, type } = req.body;

    if (!category || !type) {
      return res.send({ success: false, message: "All fields are required" });
    }
    const scanId = await generateUnique4DigitBadgeID();

    const existingScan = await Scan.findOne({ scan_category: category });

    if (existingScan) {
      return res.send({
        success: false,
        message: "Scan already exist",
      });
    }

    const newScan = await Scan({
      scan_category: category,
      scan_type: type,
      scan_status: status,
      scan_id: scanId,
    }).save();
    
    const { _id, scan_type, scan_id, scan_status, scan_category } = newScan;

    res.status(201).send({
      success: true,
      message: "Scan created successfully",
      badge: { _id, scan_category, scan_id, scan_type, scan_status },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error - Error creating Scan",
    });
  }
};

export const getScansController = async (req, res) => {
  try {
    const scans = await Scan.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: scans.length,
      message: "All Scans",
      scans,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting Scans",
    });
  }
};

export const getSingleScansController = async (req, res) => {
  try {
    const scans = await Scan.find({ scan_type: "single" }).sort({
      createdAt: -1,
    });

    res.status(200).send({
      success: true,
      TotalCount: scans.length,
      message: "All single Scans",
      scans,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single Scans",
    });
  }
};

export const getMultiScansController = async (req, res) => {
  try {
    const scans = await Scan.find({ scan_type: "multi" }).sort({
      createdAt: -1,
    });

    res.status(200).send({
      success: true,
      TotalCount: scans.length,
      message: "All Multi Scans",
      scans,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting multi Scans",
    });
  }
};

export const updateScanController = async (req, res) => {
  try {
    const { _id, category, status, type } = req.body;

    const scan = await Scan.findById(_id);

    const updatedScan = await Scan.findByIdAndUpdate(
      _id,
      {
        scan_category: category || scan.scan_category,
        scan_type: type || scan.scan_type,
        scan_status: status || scan.scan_status,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Scan Updated SUccessfully",
      updatedScan,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Update badge",
      error,
    });
  }
};

export const deleteScanController = async (req, res) => {
  try {
    const deletedScan = await Scan.findOneAndDelete(req.body._id);

    if (!deletedScan) {
      throw new Error("Scan Not found");
    }

    res.status(200).send({
      success: true,
      message: "Scan Deleted Successfully",
      deletedScan,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
