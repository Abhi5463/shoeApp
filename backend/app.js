// @ts-nocheck
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
mongoose.connect(
  "mongodb+srv://abhishekkumar54635460:OojD0tpsqBnKEHPC@cluster0.lv270pz.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());

// Import the User model from the separate user.js file
const User = require("./UserSchema"); // Adjust the path accordingly
const Shoe = require("./ShoeSchema");
// Define a secret key for JWT
const secretKey = "secret";

// During registration
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body; // Include 'role' in the request body
  const newEmail = await User.isEmailInUse(email);
  if (newEmail) {
    return res.json({ success: false, message: "Email already exists" });
  }
  const user = User({
    email,
    password,
    role
  });
  await user.save();
  res.json(user);
});

// During login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user === null)
      res.json({ success: false, message: "Enter a valid email/password" });

    const result = await user.comparePassword(password);
    if (!result)
      res.json({ success: false, message: "Enter a valid password" });
    else {
      const token = jwt.sign({ userId: user._id }, "secret", {
        expiresIn: "1d",
      });
      res.json({ success: true, user, token });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Define a GET route to fetch shoe details
app.get("/shoes", async (req, res) => {
  try {
    // Fetch all shoe documents from the database
    const shoes = await Shoe.find();
    res.status(200).json({ success: true, shoes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch shoe details" });
  }
});

// Define the POST route for uploading shoe details
app.post("/shoes", async (req, res) => {
  const { shoeName, sizesAvailable, description, shoeImage } = req.body;
  console.log(shoeName, sizesAvailable, description, shoeImage, "uploading...");
  try {
    // Create a new shoe object
    const shoe = new Shoe({
      name: shoeName,
      sizesAvailable: sizesAvailable.map(size => size.trim()), 
      description,
      image: shoeImage, // Assuming you are directly providing the image URL
    });
console.log(shoe, "console from backend");
    // Save the shoe to the database
    await shoe.save();

    res
      .status(201)
      .json({ success: true, message: "Shoe details uploaded successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Shoe details upload failed" });
  }
});

// ... (your other routes)

// Simple API endpoint to check if the server is running
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running on port 3000" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
