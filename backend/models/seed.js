const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/usermanagement");

const seedUsers = async () => {
  const users = [];

  for (let i = 1; i <= 20; i++) {
    users.push({
      name: `Demo User ${i}`,
      email: `demo${i}@mail.com`,
      password:"password1",
    });
  }

  await User.insertMany(users);
  console.log("20 Users Inserted");
  process.exit();
};

seedUsers();