const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create appointment
router.post('/', async (req, res) => {
  const { patientName, doctorName, date, reason } = req.body;
  const newAppointment = new Appointment({
    patientName,
    doctorName,
    date,
    reason
  });
  
  try {
    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const removedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    res.json(removedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
