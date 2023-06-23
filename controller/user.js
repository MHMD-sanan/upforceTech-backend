const User = require("../model/user");
const uploadImage = require("../config/cloudinary");

//get all users
const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users && users.length !== 0) {
      res.status(201).json({
        success: true,
        users,
      });
    } else {
      throw new Error("No users found");
    }
  } catch (error) {
    next(error);
  }
};

// register user
const createNewUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    gender,
    status,
    location,
    profile,
  } = req.body;
  try {
    const profileUrl = await uploadImage(profile);
    const user = await User.create({
      firstName,
      lastName,
      email,
      mobileNumber,
      gender,
      status,
      location,
      profile: profileUrl,
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//update user
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    let profileUrl;
    if (req.body.profile.startsWith("http")) {
      profileUrl = req.body.profile;
    } else {
      profileUrl = await uploadImage(req.body.profile);
    }
    const user = { ...req.body, profile: profileUrl };
    await User.findByIdAndUpdate(id, user);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//delete a user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//get individual user
const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (user) {
      res.status(201).json({
        success: true,
        user,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

//search user
const search = async (req, res, next) => {
  try {
    const { name } = req.params;
    const users = await User.find({
      $or: [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ],
    });
    if (users && users.length !== 0) {
      res.status(201).json({
        success: true,
        users,
      });
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
  search,
};
