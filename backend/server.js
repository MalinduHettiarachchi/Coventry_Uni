const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:XB2MJZMcaYi75Dey@cluster0.ecwn6.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

const upload = multer({ storage: storage });

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  contactNumber: String,
  resume: String,
});

const User = mongoose.model("User", userSchema);

// Create a POST route to save user data and send email
app.post("/api/users", upload.single("resume"), async (req, res) => {
  const { name, email, contactNumber } = req.body;

  // Save user to the database
  const newUser = new User({ name, email, contactNumber, resume: req.file.path });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: "mhssc20@gmail.com", // Your email address
        pass: "hnhn hxlb cevq gtqk", // Your email password or app password
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Registration Confirmation",
      text: `Hello ${name},\n\nThank you for registering!\n\nBest regards,\nCoventry Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
