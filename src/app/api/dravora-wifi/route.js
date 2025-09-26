import mqtt from "mqtt";

let currentIp = "";
let client;

export async function GET() {
  if (!client) {
    client = mqtt.connect(
      "mqtts://Ye5d5923dbab04155ac2dabb4d095a9a9.s1.eu.hivemq.cloud:8883",
      {
        username: "dravora.id",
        password: "@D32asdCrypt",
      }
    );

    client.on("connect", () => {
      client.subscribe("dravora/status");
    });

    console.log(client);
    client.on("message", (topic, message) => {
      if (topic === "dravora/status") {
        currentIp = message.toString();
      }
    });
  }

  return new Response(JSON.stringify({ ip: currentIp }), {
    headers: { "Content-Type": "application/json" },
  });
}
