const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../db');
const axios = require('axios');

// -------------------- FILE UPLOAD SETUP --------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// -------------------- MOCK / REAL API VERIFICATIONS --------------------

// Aadhaar Verification (Mock logic)
async function verifyAadhaar(aadhaarNumber) {
  if (!aadhaarNumber || aadhaarNumber.length !== 12) return false;

  // 🔸 Real Aadhaar verification API can be added here
  // Example:
  // const response = await axios.post('https://aadhaar-api-provider.com/verify', { aadhaarNumber });
  // return response.data.verified;

  await new Promise((r) => setTimeout(r, 500)); // simulate API delay
  return true; // assume valid
}

// PAN Verification (Regex + optional API)
async function verifyPAN(panNumber) {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panNumber || !regex.test(panNumber)) return false;

  // 🔸 You can use an external PAN verification API like Karza/Signzy later
  await new Promise((r) => setTimeout(r, 500));
  return true;
}

// Google Maps Geo-Location Validation
async function validateGeo(latitude, longitude) {
  if (!latitude || !longitude) return false;

  // 🔸 You can use Google Maps Geocoding API to verify address
  // Example:
  // const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  // const response = await axios.get(
  //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
  // );
  // return response.data.status === 'OK';

  return true; // Mock valid for now
}

// -------------------- CREATE EMPLOYEE --------------------
router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadhaar_image', maxCount: 1 },
    { name: 'pan_image', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        address,
        permanent_address,
        aadhaar_number,
        pan_number,
        latitude,
        longitude,
      } = req.body;

      // -------------------- File Paths --------------------
      const photoPath = req.files['photo']
        ? '/uploads/' + req.files['photo'][0].filename
        : null;
      const aadhaarPath = req.files['aadhaar_image']
        ? '/uploads/' + req.files['aadhaar_image'][0].filename
        : null;
      const panPath = req.files['pan_image']
        ? '/uploads/' + req.files['pan_image'][0].filename
        : null;

      // -------------------- Step 1: Verify Aadhaar, PAN, Geo --------------------
      const aadhaarVerified = await verifyAadhaar(aadhaar_number);
      const panVerified = await verifyPAN(pan_number);
      const geoValid = await validateGeo(latitude, longitude);

      if (!aadhaarVerified || !panVerified || !geoValid) {
        return res
          .status(400)
          .json({ success: false, message: 'Verification failed' });
      }

      // -------------------- Step 2: Save to DB --------------------
      const [result] = await pool.query(
        `INSERT INTO employees 
        (name, email, phone, address, permanent_address, aadhaar_number, pan_number, photo_path, aadhaar_image_path, pan_image_path, aadhaar_verified, pan_verified, location_verified, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          email,
          phone,
          address,
          permanent_address,
          aadhaar_number,
          pan_number,
          photoPath,
          aadhaarPath,
          panPath,
          aadhaarVerified ? 1 : 0,
          panVerified ? 1 : 0,
          geoValid ? 1 : 0,
          latitude,
          longitude,
        ]
      );

      res.json({
        success: true,
        message: 'Employee created and verified successfully',
        id: result.insertId,
      });
    } catch (err) {
      console.error('❌ Error creating employee:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// -------------------- GET ALL EMPLOYEES --------------------
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
