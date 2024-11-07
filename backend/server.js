  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const multer = require("multer");
  const nodemailer = require("nodemailer");
  const path = require("path");
  require("dotenv").config();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Connect to MongoDB (Use your correct MongoDB URI)
  mongoose.connect("mongodb+srv://admin:XB2MJZMcaYi75Dey@cluster0.ecwn6.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

  // Set up multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");  // Ensure "uploads/" folder exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage });

  // Define user schema with timestamps to automatically track createdAt
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contactNumber: String,
    resume: String,
  }, { collection: "lectuerreq", timestamps: true }); // timestamps adds createdAt

  // Create a model for the "lectuerreq" collection
  const User = mongoose.model("User", userSchema);

  // Route to fetch lecturer requests
  app.get("/api/lecturerreq", async (req, res) => {
    try {
      const lecturerRequests = await User.find().sort({ createdAt: -1 });
      res.status(200).json(lecturerRequests);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch lecturer requests" });
    }
  });

  // Route to save user data and send email
  app.post("/api/users", upload.single("resume"), async (req, res) => {
    const { name, email, contactNumber } = req.body;
    const newUser = new User({ name, email, contactNumber, resume: req.file.path });

    try {
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });

      // Email setup
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mhssc20@gmail.com",
          pass: "hnhn hxlb cevq gtqk",
        },
      });

      const mailOptions = {
        from: "mhssc20@gmail.com",  // Use environment variable for sender email
        to: email,
        subject: "Registration Confirmation",
        text: `Hello ${name},\n\nThank you for registering!\n\nBest regards,\nCoventry Team`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  // Lecturer Schema for second part of your request (if needed)
  const lecturerSchema = new mongoose.Schema({
    name: String,
    email: String,
    contactNumber: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
  });

  const Lecturer = mongoose.model('Lecturer', lecturerSchema);

  // POST route for adding a new lecturer
  app.post('/api/lecturer', async (req, res) => {
    try {
      const { name, email, contactNumber } = req.body;
      
      // Generate password: First two letters of name + contact number, prefixed with 'L'
      const generatedPassword = `L${name.slice(0, 2)}${contactNumber}`;
      
      // Create a new lecturer entry
      const newLecturer = new Lecturer({
        name,
        email,
        contactNumber,
        password: generatedPassword,
      });
      
      await newLecturer.save();  // Save to database

      res.status(201).send('Lecturer added successfully');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Course Schema (if it does not exist yet)
const courseSchema = new mongoose.Schema({
  name: String,
  department: String,
  duration: String,
  fees: Number,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Create a model for the "courses" collection
const Course = mongoose.model('Course', courseSchema);

// Route to fetch all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.get("/api/courses", async (req, res) => {
  try {
    const { department } = req.query; // Extract department query
    const query = department ? { department } : {}; // If department is provided, filter by department
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.post("/api/courses", async (req, res) => {
  try {
    const { name, department, duration, fees, description } = req.body;
    const newCourse = new Course({
      name,
      department,
      duration,
      fees,
      description,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add course" });
  }
});

app.get("/api/courses", async (req, res) => {
  try {
    const { department } = req.query;  // Get department query from URL
    const query = department ? { department } : {};  // Filter by department if provided
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Course Schema (make sure this exists)


// Route to fetch courses by department
app.get("/api/courses", async (req, res) => {
  try {
    const { department } = req.query; // Extract department query
    const query = department ? { department } : {}; // If department is provided, filter by department
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Route to add courses (for testing purposes)
app.post("/api/courses", async (req, res) => {
  try {
    const { name, department, duration, fees, description } = req.body;
    const newCourse = new Course({
      name,
      department,
      duration,
      fees,
      description,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add course" });
  }
});

app.get("/api/courses", async (req, res) => {
  try {
    const { department } = req.query;  // Get department query from URL
    const query = department ? { department } : {};  // Filter by department if provided
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Route to add a new course
app.post("/api/courses", async (req, res) => {
  try {
    const { name, department, duration, fees, description } = req.body;
    const newCourse = new Course({
      name,
      department,
      duration,
      fees,
      description,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add course" });
  }
});

app.get('/api/courses/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


/////////////////////////////////////////////////////////////////////////////////

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  contactNumber: String,
  password: String,
  course: String,
  createdAt: { type: Date, default: Date.now },
});

// Create a model for the "students" collection
const Student = mongoose.model("Student", studentSchema);

// Route to register a student
app.post("/api/register-student", async (req, res) => {
  const { name, email, contactNumber, course } = req.body;

  // Generate password: first two letters of name + contact number, prefixed with 'S'
  const generatedPassword = `S${name.slice(0, 2)}${contactNumber}`;

  try {
    // Create a new student entry
    const newStudent = new Student({
      name,
      email,
      contactNumber,
      password: generatedPassword,
      course,  // Store the selected course
    });

    await newStudent.save(); // Save student data to the "students" collection

    // Set up Nodemailer for email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mhssc20@gmail.com",
        pass: "hnhn hxlb cevq gtqk",
      },
    });

    const mailOptions = {
      from: "mhssc20@gmail.com",
      to: email,
      subject: "Student Registration Confirmation",
      text: `Hello ${name},\n\nYour registration for the course "${course}" is successful!\nYour login password is: ${generatedPassword}\n\nBest regards,\nCoventry Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json({ message: "Student registered and email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register student" });
  }
});

///////////////////////////////////////////////////////////////////////////////////
// Route to send an email to the lecturer with their username and password
app.post("/api/send-lecturer-email", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Store your email in an environment variable
        pass: process.env.EMAIL_PASS, // Store your app-specific password in an environment variable
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Lecturer Account Details",
      text: `Hello ${name},\n\nYour lecturer account has been created.\n\nUsername: ${email}\nPassword: ${password}\n\nBest regards,\nCoventry Team`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

///////////////////////////////////////////////////






  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


