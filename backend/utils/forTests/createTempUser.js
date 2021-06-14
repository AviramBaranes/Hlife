const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const { connectDb } = require("../databaseForTest");

module.exports = fakeUser = async () => {
  connectDb()
    .then((_) => {
      return bcrypt.hash("testpass123", 10);
    })
    .then((hashedPassword) => {
      const user = new User({
        name: "tester",
        username: "tester",
        email: "test@test.com",
        password: hashedPassword,
        gender: "male",
        dateOfBirth: "02/01/2000",
      });
      return user.save();
    });
};
