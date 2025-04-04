// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Setup Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "idkthepassword", // replace with your MySQL password
  database: "fund",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// POST route for fundraiser creation
app.post("/create_event", upload.single("image"), (req, res) => {
  const { title, description, goal, contractAddress } = req.body;
  console.log(title, description, goal, contractAddress);
  const imagePath = req.file ? req.file.path : null;

  const query = `
    INSERT INTO fundraisers (title, description, goal, contract_address, image_path)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [title, description, goal, contractAddress, imagePath],
    (err, result) => {
      if (err) {
        console.error("Error inserting fundraiser:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }

      return res.status(200).json({
        message: "Fundraiser created successfully",
        fundraiserId: result.insertId,
      });
    }
  );
});
app.get("/contract-details", (req, res) => {
  const { address } = req.query;
  console.log(address);
  if (!address) {
    return res.status(400).json({ error: "Missing address parameter" });
  }

  const query = "SELECT title, description, image_path FROM fundraisers WHERE contract_address = ?";
  db.query(query, [address], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No fundraiser found for this address" });
    }

    const { title, description, image_path } = results[0];
    res.json({
      title,
      description,
      image: image_path || "/images/disaster.jpeg"
    });
  });
});
// Start server
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
