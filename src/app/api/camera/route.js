// app/api/camera/route.js
import http from "http";

export const GET = async (req) => {
  return new Promise((resolve, reject) => {
    const camUrl = "http://192.168.1.11/stream";

    http
      .get(camUrl, (camRes) => {
        const headers = new Headers();
        for (const [key, value] of Object.entries(camRes.headers)) {
          headers.set(key, value);
        }

        resolve(new Response(camRes, { status: camRes.statusCode, headers }));
      })
      .on("error", (err) => {
        resolve(new Response("Error fetching camera stream", { status: 500 }));
      });
  });
};
