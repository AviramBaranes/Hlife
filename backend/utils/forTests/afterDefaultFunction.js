const { disconnectDb } = require("../databaseForTest");
const User = require("../../models/User");
const PhysicalStats = require("../../models/PhysicalStats");
const Diet = require("../../models/Diet");
const DietExecution = require("../../models/DietExecution");
const Program = require("../../models/Program");
const ProgramExecution = require("../../models/ProgramExecution");

module.exports = async () => {
  await User.deleteMany();
  await Diet.deleteMany();
  await DietExecution.deleteMany();
  await PhysicalStats.deleteMany();
  await Program.deleteMany();
  await ProgramExecution.deleteMany();
  await disconnectDb();
};
