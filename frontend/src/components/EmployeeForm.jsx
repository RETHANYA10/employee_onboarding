import React, { useState } from "react";
import API from "../services/api";
import "../index.css"; // ✅ Import global styles

export default function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    permanent_address: "",
    aadhaar_number: "",
    pan_number: "",
  });

  const [photo, setPhoto] = useState(null);
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [status, setStatus] = useState("");

  // 📍 Get Geo-location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => alert("Unable to fetch location")
      );
    }
  };

  // 🧠 Verification logic
  const verifyAadhaar = () => {
    if (form.aadhaar_number.length === 12) {
      setStatus("✅ Aadhaar Verified");
    } else {
      setStatus("❌ Invalid Aadhaar Number");
    }
  };

  const verifyPAN = () => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (regex.test(form.pan_number)) {
      setStatus("✅ PAN Verified");
    } else {
      setStatus("❌ Invalid PAN Format");
    }
  };

  // 📨 Submit Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("photo", photo);
    data.append("aadhaar_image", aadhaarImage);
    data.append("pan_image", panImage);
    data.append("latitude", location.lat);
    data.append("longitude", location.lng);

    try {
      setStatus("Submitting...");
      const res = await API.post("/employees", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("✅ Employee submitted successfully!");
      console.log(res.data);
    } catch (err) {
      setStatus("❌ Submission failed. Please verify details.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>🧑‍💼 Employee Onboarding Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label>Email:</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label>Phone:</label>
        <input
          type="text"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <label>Current Address:</label>
        <textarea
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <label>Permanent Address:</label>
        <textarea
          required
          value={form.permanent_address}
          onChange={(e) =>
            setForm({ ...form, permanent_address: e.target.value })
          }
        />

        <label>Aadhaar Number:</label>
        <input
          type="text"
          maxLength="12"
          value={form.aadhaar_number}
          onBlur={verifyAadhaar}
          onChange={(e) =>
            setForm({ ...form, aadhaar_number: e.target.value })
          }
        />

        <label>PAN Number:</label>
        <input
          type="text"
          maxLength="10"
          value={form.pan_number}
          onBlur={verifyPAN}
          onChange={(e) => setForm({ ...form, pan_number: e.target.value })}
        />

        <label>Photo:</label>
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

        <label>Aadhaar Image:</label>
        <input
          type="file"
          onChange={(e) => setAadhaarImage(e.target.files[0])}
        />

        <label>PAN Image:</label>
        <input type="file" onChange={(e) => setPanImage(e.target.files[0])} />

        <button type="button" onClick={fetchLocation}>
          📍 Get Location
        </button>

        {location.lat && (
          <p className="location-text">
            Location captured: {location.lat}, {location.lng}
          </p>
        )}

        <p className="status-text">{status}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
