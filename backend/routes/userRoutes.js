const express = require("express");
const router = express.Router();

const { getUsers, login,register ,updateUsers,deleteUsers} = require("../controllers/userController");

// GET users
router.get("/users", getUsers);

router.post("/register", register);
router.post("/login", login);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);


module.exports = router;