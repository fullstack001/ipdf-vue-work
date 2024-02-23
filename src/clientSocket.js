// Import socket.io-client
import io from "socket.io-client";

// Client-side code (for clients)
// const socket = io("http://127.0.0.1:5000", {
//   transports: ["websocket", "polling"],
// });
const socket = io("https://api.pdfden.com", {
  transports: ["websocket", "polling"],
});

// Listen for request from server
socket.on("requestData", async () => {
  // Fetch client data
  const clientData = await {
    ipAddress: await getIPAddress(),
    currentURL: window.location.href,
    browserName: getBrowserName(),
  };

  // Send response to server
  socket.emit("clientData", clientData);
});

// Function to get IP address
async function getIPAddress() {
  // This won't give the public IP but the local IP address.
  let ipAddress = await fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      return data.ip.split(" ")[0];
    });
  return ipAddress;
}

// Function to get browser name
function getBrowserName() {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";

  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
  } else if (
    userAgent.indexOf("MSIE") > -1 ||
    userAgent.indexOf("Trident/") > -1
  ) {
    browserName = "Internet Explorer";
  }

  return browserName;
}
