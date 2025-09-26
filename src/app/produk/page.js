"use client";
import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function CameraPage() {
  const [ip, setIp] = useState("");
  const [client, setClient] = useState(null);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [flashOn, setFlashOn] = useState(false); // status flash realtime

  useEffect(() => {
    const c = mqtt.connect(
      "wss://e5d5923dbab04155ac2dabb4d095a9a9.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "dravora.id",
        password: "@D32asdCrypt",
        connectTimeout: 4000,
        reconnectPeriod: 1000,
      }
    );

    c.on("connect", () => {
      console.log("MQTT Connected");
      c.subscribe("dravora/status");
      c.subscribe("dravora/flashStatus"); // subscribe status flash
    });

    c.on("message", (topic, message) => {
      const msg = message.toString();
      console.log("Received:", topic, msg);

      if (topic === "dravora/status") {
        setIp(msg.replace("IP:", ""));
      }

      if (topic === "dravora/flashStatus") {
        console.log(msg);
        setFlashOn(msg === "on"); // update realtime
      }
    });

    setClient(c);

    return () => {
      c.end();
    };
  }, []);

  const controlFlash = (state) => {
    if (client) {
      client.publish("dravora/commands", `flash:${state}`);
    }
  };

  const updateWiFi = (e) => {
    e.preventDefault();
    if (client && ssid && password) {
      const msg = `${ssid}|${password}`;
      client.publish("dravora/wifi", msg);
      alert("WiFi credentials sent! ESP32 akan restart...");
      setSsid("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
        <span className="text-rose-500">D01</span> Ccam Basic
      </h1>
      <p className="text-center text-gray-400 mb-6">Dravora.id</p>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg mx-auto">
        {/* Status Card */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-700">Camera Status:</span>
          <span
            className={`font-bold ${
              ip ? "text-green-600" : "text-red-600 animate-pulse"
            }`}
          >
            {ip ? "Online" : "Offline"}
          </span>
        </div>

        {/* Flash Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-700">Lamp Status:</span>
          <span
            className={`font-bold ${
              flashOn ? "text-yellow-500" : "text-gray-500"
            }`}
          >
            {flashOn ? "ON" : "OFF"}
          </span>
        </div>

        {/* IP Address */}
        <div className="mb-4 flex">
          <span className="font-semibold text-gray-700">Type Camera :</span>
          <span className="ml-2 text-gray-600">D01-Camera</span>
        </div>

        {/* Stream */}
        {ip ? (
          <div className="border rounded-xl overflow-hidden shadow-md mb-4">
            <img
              src={`http://${ip}/stream`}
              alt="ESP32 CAM Stream"
              className="w-full object-cover aspect-video"
            />
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10 border border-dashed border-gray-300 rounded-xl mb-4">
            <p className="text-lg mb-2">No stream available</p>
            <p className="text-sm">Waiting for ESP32 to connect...</p>
          </div>
        )}

        {/* Flash Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => controlFlash("on")}
            className={`px-4 py-2 rounded-lg shadow transition ${
              flashOn
                ? "bg-green-600 text-white"
                : "bg-rose-500 text-white hover:bg-rose-600"
            }`}
          >
            Flash On
          </button>
          <button
            onClick={() => controlFlash("off")}
            className={`px-4 py-2 rounded-lg shadow transition ${
              !flashOn
                ? "bg-gray-800 text-white"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Flash Off
          </button>
        </div>

        {/* Update WiFi Form */}
        <form
          onSubmit={updateWiFi}
          className="bg-gray-100 p-4 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Update WiFi
          </h2>
          <input
            type="text"
            placeholder="New SSID"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-md text-black"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-md text-black"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save & Restart
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          Made By Dravora.id
        </div>
      </div>
    </div>
  );
}
