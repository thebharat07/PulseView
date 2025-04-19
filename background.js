let ports = [];

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "networkMonitor") {
    ports.push(port);

    port.onDisconnect.addListener(() => {
      ports = ports.filter(p => p !== port);
    });
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const requestData = {
      method: details.method,
      url: details.url,
      timeStamp: new Date(details.timeStamp).toLocaleTimeString()
    };

    ports.forEach((port) => {
      port.postMessage({ type: "request", payload: requestData });
    });
  },
  { urls: ["<all_urls>"] },
  []
);
