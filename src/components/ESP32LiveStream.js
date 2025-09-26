"use client";

import { useEffect, useState } from "react";

export default function ESP32LiveStream({ espIp }) {
  const [frameUrl, setFrameUrl] = useState("");

  useEffect(() => {
    if (!espIp) return;

    const updateFrame = () => {
      // Tambah timestamp biar browser ga cache
      setFrameUrl(`http://${espIp}/stream?t=${Date.now()}`);
    };

    // Update tiap 200ms (5fps)
    const interval = setInterval(updateFrame, 200);

    return () => clearInterval(interval);
  }, [espIp]);

  return (
    <div className="w-full border rounded overflow-hidden">
      {frameUrl ? (
        <img
          src={frameUrl}
          alt="ESP32-CAM Live Stream"
          className="w-full"
          crossOrigin="anonymous"
        />
      ) : (
        <p className="text-center p-4 text-gray-500">Connecting to stream...</p>
      )}
    </div>
  );
}
