const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const jwt_SECRET = require("../config/jwt");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordconfirm, displayName } = req.body;
    //validate

    if (!email || !password || !passwordconfirm)
      return res.status(400).json({ msg: "Not all field entered" });
    if (!/\S+@\S+\.\S+/.test(email))
      return res.status(400).json({ msg: "No valid email address" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "password needs to be at least 8 characters long" });
    if (password !== passwordconfirm)
      return res.status(400).json({ msg: "Password doesn't match" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: "Email already exist" });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate

    if (!email || !password)
      return res.status(400).json({ msg: "Not all field entered" });

    if (!/\S+@\S+\.\S+/.test(email))
      return res.status(400).json({ msg: "No valid email address" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email address is registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Invalid password",
      });

    const token = jwt.sign({ id: user._id }, jwt_SECRET.sr);

    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.jwt_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;
