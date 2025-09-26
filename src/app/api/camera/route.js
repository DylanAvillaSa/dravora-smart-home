// app/api/camera/route.js
import http from "http";

export const GET = async (req) => {
  return new Promise((resolve, reject) => {
    const camIp = "192.168.1.11"; // nanti bisa diganti dynamic
    const camUrl = `http://${camIp}/stream`;

    http
      .get(camUrl, (camRes) => {
        // header MJPEG
        const headers = new Headers({
          "Content-Type": "multipart/x-mixed-replace; boundary=frame",
        });

        // response streaming
        resolve(
          new Response(camRes, {
            status: 200,
            headers,
          })
        );
      })
      .on("error", (err) => {
        resolve(new Response("Error fetching camera stream", { status: 500 }));
      });
  });
};
