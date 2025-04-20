function initWidget() {
  const port = chrome.runtime.connect({ name: "networkMonitor" });

  const widget = document.createElement("div");
  widget.id = "network-widget";
  widget.style.position = "fixed";
  widget.style.bottom = "10px";
  widget.style.right = "10px";
  widget.style.width = "320px";
  widget.style.height = "350px";
  widget.style.minWidth = "250px";
  widget.style.minHeight = "250px";
  widget.style.resize = "both";
  widget.style.overflow = "auto";
  widget.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  widget.style.color = "#fff";
  widget.style.fontSize = "12px";
  widget.style.padding = "10px";
  widget.style.zIndex = "99999";
  widget.style.borderRadius = "10px";
  widget.style.boxSizing = "border-box";

  const logoUrl = chrome.runtime.getURL("libs/pulse.png"); // adjust path if needed

  widget.innerHTML = `
    <div id="widget-header" style="cursor: move; font-weight: bold;"><img id="pulse-logo" style="width: 20px; height: 20px; vertical-align: middle;" /> PulseView</div>
    <canvas id="reqChart" style="margin-top: 10px; width:100%; height:180px;"></canvas>
    <div id="log" style="margin-top: 10px; max-height: 100px; overflow-y: auto;"></div>
  `;

  document.body.appendChild(widget);

  document.getElementById("pulse-logo").src = logoUrl;

  // Chart init
  const ctx = document.getElementById("reqChart").getContext("2d");
  const methodCounts = { GET: 0, POST: 0, PUT: 0, DELETE: 0, PATCH: 0, OTHER: 0 };

  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(methodCounts),
      datasets: [{
        label: "# of Requests",
        data: Object.values(methodCounts),
        backgroundColor: "rgba(75,192,192,0.6)"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true, ticks: { color: "#fff" } },
        x: { ticks: { color: "#fff" } }
      }
    }
  });

  const logDiv = document.getElementById("log");

  port.onMessage.addListener((msg) => {
    if (msg.type === "request") {
      const { method, url, timeStamp } = msg.payload;
      const displayMethod = methodCounts.hasOwnProperty(method) ? method : "OTHER";
      methodCounts[displayMethod] += 1;

      // Update chart
      chart.data.datasets[0].data = Object.values(methodCounts);
      chart.update();

      // Log
      const entry = document.createElement("div");
      entry.textContent = `[${timeStamp}] ${method} - ${url}`;
      entry.style.borderBottom = "1px solid #444";
      entry.style.padding = "4px 0";
      logDiv.prepend(entry);

      if (logDiv.children.length > 50) {
        logDiv.removeChild(logDiv.lastChild);
      }
    }
  });

  // Drag logic
  let isDragging = false;
  let offsetX, offsetY;
  const header = document.getElementById("widget-header");

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    widget.style.left = `${e.clientX - offsetX}px`;
    widget.style.top = `${e.clientY - offsetY}px`;
    widget.style.right = "auto";
    widget.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
  });
}

const chartScript = document.createElement("script");
chartScript.src = "...";
initWidget();
