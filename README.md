# 🛰️ PulseView

A lightweight Chrome extension that provides **real-time monitoring of all network requests** made by any webpage you're browsing — perfect for developers, testers, and curious techies.

---

## 📸 Preview

![PulseView Widget Preview](https://github.com/user-attachments/assets/360b1bf8-c632-436c-b701-64b384a9a26d)



---

## 🚀 Features

- 🔍 Tracks **XHR**, **Fetch**, **Script**, and other network requests
- 🧭 Displays a **floating widget** on any webpage with live updates
- 🔄 **Switch tabs** and view request logs specific to each one
- ⏱️ View method, URL, and status of each request
- 💡 Works without needing to open Chrome DevTools

---

## 💼 Use Cases

- Debug APIs while navigating any frontend
- Monitor third-party requests, scripts, and trackers
- Analyze dynamic content loads on SPAs
- Inspect request patterns during performance tests

---

## 📦 Installation (Dev Mode)

1. Clone or download this repo.
2. Open Chrome and go to [`chrome://extensions/`](chrome://extensions/)
3. Enable **Developer Mode** (top right toggle).
4. Click **Load Unpacked** and select the folder containing this extension.

---


## 🧠 How It Works

- The **background script** listens to all network requests using Chrome's `webRequest` API.
- It stores the request info tab-wise in local storage.
- The **content script** injects a widget into the webpage that fetches and displays this data.
- When you switch tabs, the widget updates accordingly.

---

## ⚙️ Permissions Used

```json
"permissions": [
  "webRequest",
  "tabs",
  "storage",
  "scripting",
  "<all_urls>"
],
"host_permissions": [
  "<all_urls>"
]
