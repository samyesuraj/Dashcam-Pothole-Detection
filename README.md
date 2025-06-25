
# Dashcam Pothole Detection 🚗🕳️

A real-time pothole detection system using dashcam video and GPS data. This project leverages an ESP32-CAM module for capturing video, a machine learning model for detecting potholes, and a server-based web application to display detections on a live map.

---

## 🛠️ Features

- 📷 Captures live road video via ESP32-CAM
- 🌐 Sends GPS coordinates and video to a local server
- 🧠 Uses machine learning to detect potholes in video frames
- 🗺️ Displays pothole locations and intensity levels on an interactive map
- 📱 Web dashboard with real-time updates and camera feed


## 📡 Hardware Used

- ESP32
- OV7670 Camera Module
- GPS module - NEO 6M
- Laptop/server for processing and visualization


## 🧠 Software Stack

- Python
- OpenCV, NumPy
- Pre-trained CNN or YOLO-based pothole detector
- JavaScript (Leaflet.js for mapping)
- HTML/CSS


## 🚀 How It Works

1. **ESP32-CAM** captures road video and GPS coordinates.
2. Data is sent to the **Flask server** on your laptop via HTTP.
3. The **ML model** processes incoming frames to detect potholes.
4. Detected potholes are plotted on a **live web map** with intensity markers.
5. A **camera feed page** allows real-time monitoring.

---

## 🧪 Setup Instructions

### 1. ESP32-CAM + GPS

- Flash the code in `esp32/ESP32_I2S_Camera.ino` using Arduino IDE.
- Connect GPS module via UART (e.g., RX2/TX2).

### 2. Server Setup

```bash
cd server
pip install -r requirements.txt
python app.py
```

### 3. Web Dashboard

- Open `localhost:5000` to view map and pothole updates.
- Visit `/camera` to see the live camera feed.

---

## 📌 Future Improvements

- Cloud-based processing and storage
- Mobile app integration
- Speed-based pothole severity adjustment
- Road quality analytics over time

## 🤝 Contributing

Pull requests and ideas are welcome! Please open an issue first to discuss proposed changes.

## ✅ Acknowledgments

- ESP32-CAM WebSocket streaming inspired by [mudassar-tamboli/ESP32-OV7670-WebSocket-Camera](https://github.com/mudassar-tamboli/ESP32-OV7670-WebSocket-Camera)

## 📄 License

MIT License

---

## ✨ Authors

- Sam Yesuraj
- Vasavlal Bhaskar
- Sreyas M Sunil
- Shan Shibu
