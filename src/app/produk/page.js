"use client";
import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function CameraPage() {
  const [ip, setIp] = useState("");

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
      c.subscribe("d01/ip");
    });

    c.on("message", (topic, message) => {
      const msg = message.toString();
      console.log(msg);
      setIp(msg);
    });

    return () => {
      c.end();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-10">
      {" "}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        {" "}
        <span className="text-rose-500">D01</span> Ccam Basic{" "}
      </h1>
      {!ip ? (
        <div className="text-center text-gray-400 py-10 border border-dashed border-gray-600 rounded-xl w-full max-w-lg">
          <p className="text-lg mb-2">Waiting for camera...</p>
          <p className="text-sm">ESP32 belum publish IP ke MQTT</p>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {/* Stream Preview */}
          <div className="text-center text-gray-400 py-10 border border-dashed border-gray-600 rounded-xl w-full max-w-lg">
            <p className="text-lg mb-2">Camera founded...</p>
            <p className="text-sm">
              Camera Sudah terbaca silahkan klik dibawah
            </p>
          </div>

          {/* Direct Access */}
          <a
            href={ip}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center w-full mt-5 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg shadow-md font-semibold transition"
          >
            Buka Streaming
          </a>
        </div>
      )}
      <footer className="mt-10 text-sm text-gray-400">
        Made by Dravora.id
      </footer>
    </div>
  );
}
