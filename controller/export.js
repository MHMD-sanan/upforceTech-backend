const User = require("../model/user");
const json2csv = require("json2csv").parse;
const exportToCsv = async (req, res, next) => {
  try {
    const users = await User.find();

    const fields = ["firstName", "lastName","email","mobileNumber","gender","status","location"];
    const csvData = json2csv(users, { fields });
    res.send(csvData);
  } catch (error) {
    next(error);
  }
};

module.exports = exportToCsv;
