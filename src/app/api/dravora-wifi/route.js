// file: app/api/wifi/route.js
let wifiCredentials = {
  ssid: null,
  password: null,
};

// POST -> user kirim SSID & password
export async function POST(req) {
  try {
    const { ssid, password } = await req.json();

    if (!ssid || !password) {
      return new Response(
        JSON.stringify({ error: "SSID or password missing" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // simpan sementara di memory
    wifiCredentials.ssid = ssid;
    wifiCredentials.password = password;

    return new Response(JSON.stringify({ message: "WiFi credentials saved" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// GET -> ESP32CAM fetch SSID & password
export async function GET() {
  if (!wifiCredentials.ssid || !wifiCredentials.password) {
    return new Response(JSON.stringify({ error: "No WiFi credentials set" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(wifiCredentials), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
