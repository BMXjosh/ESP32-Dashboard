// ---------- CONFIG ----------
const DEVICE_ID = "ZYESP32";                       // change if different
const MQTT_HOST = "wss://broker.hivemq.com:8884/mqtt";
const USER      = DEVICE_ID;
const PASS      = "49aed91892f94fffb69fc1d2d686b60f";
// -----------------------------

import mqtt from "https://unpkg.com/mqtt/dist/mqtt.min.js";

const client = mqtt.connect(MQTT_HOST, {
  username: USER,
  password: PASS
});

client.on("connect", () => {
  document.getElementById("title").textContent = DEVICE_ID + " online";
  client.subscribe(`dev/${DEVICE_ID}/telemetry`);
  client.subscribe(`dev/${DEVICE_ID}/state`);
});

client.on("message", (topic, payload) => {
  const msg = JSON.parse(payload.toString());
  if (topic.endsWith("telemetry")) {
    document.getElementById("voltage").textContent = msg.v.toFixed(1) + " V";
  }
});

window.send = cmd => {
  client.publish(`dev/${DEVICE_ID}/cmd`, JSON.stringify({cmd}));
};
