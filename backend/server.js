const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://mongo:27017/hospitaldb";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  address: String
});

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  phone: String,
  availability: String
});

const Patient = mongoose.model("Patient", patientSchema);
const Doctor = mongoose.model("Doctor", doctorSchema);

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working" });
});

app.get("/api/patients", async (req, res) => {
  try {
    res.json(await Patient.find().sort({ _id: -1 }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/patients", async (req, res) => {
  try {
    const patient = await new Patient({
      name: req.body.name,
      age: Number(req.body.age),
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address
    }).save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/patients/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/doctors", async (req, res) => {
  try {
    res.json(await Doctor.find().sort({ _id: -1 }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/doctors", async (req, res) => {
  try {
    const doctor = await new Doctor({
      name: req.body.name,
      specialization: req.body.specialization,
      phone: req.body.phone,
      availability: req.body.availability || "Available"
    }).save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/doctors/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

startServer();
