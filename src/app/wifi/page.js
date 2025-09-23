"use client";
import React, { useState } from "react";

const FormWifi = () => {
  const [formData, setFormData] = useState({ ssid: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // user submit SSID & password
      await fetch("/api/dravora-wifi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ssid: formData.ssid,
          password: formData.password,
        }),
      });
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ssid Wifi"
        name="ssid"
        value={formData.ssid}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Password Wifi"
        name="password  "
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormWifi;
