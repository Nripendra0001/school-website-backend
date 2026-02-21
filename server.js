const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Request log
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/fees", require("./routes/feeRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));

app.get("/", (req, res) => {
  res.send("School ERP Backend Running ✅");
});

// Error handler (IMPORTANT)
app.use((err, req, res, next) => {
  console.log("🔥 SERVER ERROR:", err);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/admission", require("./routes/admissionRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));




