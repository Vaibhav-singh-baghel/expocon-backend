import Badge from "../model/badge.model.js";

export const createBadgeController = async (req, res) => {
  try {
    const { category, status } = req.body;

    if (!category) {
      return res
        .status(400)
        .send({ success: false, message: "Category is required" });
    }

    const existingBadge = await Badge.findOne({ badge_category: category });
    if (existingBadge) {
      return res.status(400).send({
        success: false,
        message: "Badges already exist for this category",
      });
    }


    const newBadge = await new Badge({
      badge_category: category,
      badge_status: status,
    }).save();

    const { _id, badge_status, badge_category } = newBadge;

    res.status(201).send({
      success: true,
      message: "Badge created successfully",
      badge: { _id, badge_category, badge_status },
    });
  } catch (error) {
    console.error("Error creating badge:", error.message);
    res.status(500).send({
      success: false,
      message: "Internal Server Error - Error creating badge",
    });
  }
};

export const getBadgesController = async (req, res) => {
  try {
    const badges = await Badge.find({}).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      TotalCount: badges.length,
      message: "All Badges",
      badges,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting badges",
    });
  }
};

export const updateBadgeController = async (req, res) => {
  try {
    const { _id, category, status } = req.body;

    const badge = await Badge.findById(_id);

    const updatedBadge = await Badge.findByIdAndUpdate(
      _id,
      {
        badge_category: category || badge.badge_category,
        badge_status: status || badge.badge_status,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "badge Updated SUccessfully",
      updatedBadge,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Update badge",
      error,
    });
  }
};

export const deleteBadgeController = async (req, res) => {
  try {
    const badge = await Badge.findOneAndDelete(req.body._id);

    if (!badge) {
      throw new Error("badge Not found");
    }

    res.status(200).send({
      success: true,
      message: "badge Deleted Successfully",
      badge,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
