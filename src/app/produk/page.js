"use client";
import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function CameraPage() {
  const [ip, setIp] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [status, setStatus] = useState("offline");

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
      console.log("✅ MQTT Connected");
      c.subscribe("d01/status");
      c.subscribe("d01/ip");
    });

    c.on("message", (topic, message) => {
      const msg = message.toString();

      if (topic === "d01/status") {
        setStatus(msg);
        if (msg === "offline") {
          setIp("");
          setStreamUrl("");
        }
      }

      if (topic === "d01/ip" && status === "online") {
        setIp(msg);
        setStreamUrl(msg + "?t=" + new Date().getTime());
      }
    });

    return () => {
      c.end();
    };
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="text-rose-500">D01</span> Ccam Basic
      </h1>

      {/* Status Indikator */}
      <div className="flex items-center gap-2 mb-6">
        <span
          className={`w-3 h-3 rounded-full ${
            status === "online" ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <span className="text-sm text-gray-300">
          {status === "online" ? "Kamera Online" : "Kamera Offline"}
        </span>
      </div>

      {status !== "online" || !ip ? (
        <div className="text-center text-gray-400 py-10 border border-dashed border-gray-600 rounded-xl w-full max-w-lg">
          <p className="text-lg mb-2">Menunggu...</p>
          <p className="text-sm">Kamera belum terkoneksi silahkan tunggu</p>
        </div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col items-center gap-5">
          <div className="text-center text-gray-400 py-10 border border-dashed border-gray-600 rounded-xl w-full max-w-lg">
            <p className="text-lg mb-2">Kamera Terdeteksi...</p>
            <p className="text-sm">
              Kamera terkoneksi silahkan klik tombol dibawah 😁✌️
            </p>
          </div>
          <a
            href={streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center w-full mt-2 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg shadow-md font-semibold transition"
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
