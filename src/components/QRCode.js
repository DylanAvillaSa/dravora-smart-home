"use client";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCode() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">QR Code D01 Cam Setup</h1>

      {/* QR Code untuk buka 192.168.4.1 */}
      <QRCodeCanvas
        value="https://dravora-smart-home.vercel.app/produk"
        bgColor="#ffffff"
        size={500}
        fgColor="#000000"
        level="H" // error correction (H = High)
        includeMargin={true}
      />

      <p className="mt-4 text-gray-600">
        Scan barcode ini untuk akses ke <strong>192.168.4.1</strong>
      </p>
    </div>
  );
}
