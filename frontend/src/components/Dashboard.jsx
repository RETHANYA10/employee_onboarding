import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    API.get("/employees")
      .then((res) => setRows(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2>📋 Employee Dashboard</h2>
      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{
          margin: "20px auto",
          width: "95%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead style={{ backgroundColor: "#007bff", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Aadhaar Verified</th>
            <th>PAN Verified</th>
            <th>Location Verified</th>
            <th>Photo</th>
            <th>Aadhaar</th>
            <th>PAN</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>{r.aadhaar_verified ? "✅ Yes" : "❌ No"}</td>
                <td>{r.pan_verified ? "✅ Yes" : "❌ No"}</td>
                <td>{r.location_verified ? "✅ Yes" : "❌ No"}</td>
                <td>
                  {r.photo_path && (
                    <img
                      src={`http://localhost:4000${r.photo_path}`}
                      alt="photo"
                      width="60"
                      height="60"
                      style={{ borderRadius: "8px" }}
                    />
                  )}
                </td>
                <td>
                  {r.aadhaar_image_path && (
                    <img
                      src={`http://localhost:4000${r.aadhaar_image_path}`}
                      alt="aadhaar"
                      width="60"
                      height="60"
                      style={{ borderRadius: "8px" }}
                    />
                  )}
                </td>
                <td>
                  {r.pan_image_path && (
                    <img
                      src={`http://localhost:4000${r.pan_image_path}`}
                      alt="pan"
                      width="60"
                      height="60"
                      style={{ borderRadius: "8px" }}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
