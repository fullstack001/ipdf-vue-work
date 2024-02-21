// Import socket.io-client
import io from "socket.io-client";

// Client-side code (for clients)
// const socket = io("http://127.0.0.1:5000", {
//   transports: ["websocket", "polling"],
// });
const socket = io("https://api.pdfdne.com", {
  transports: ["websocket", "polling"],
});

// Listen for request from server
socket.on("requestData", () => {
  // Fetch client data
  const clientData = {
    ipAddress: getIPAddress(),
    currentURL: window.location.href,
    browserName: getBrowserName(),
  };

  // Send response to server
  socket.emit("clientData", clientData);
});

// Function to get IP address
function getIPAddress() {
  // This won't give the public IP but the local IP address.
  return window.location.hostname;
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
