import numpy as np
from ultralytics import YOLO
import cv2
import requests
import numpy as np
import time

# Placeholder for storing pothole data
pothole_data = []

def process_camera_feed(frame):
    # Dummy function to simulate pothole detection
    # Replace this with actual image processing logic
    # For example, using OpenCV to detect potholes
    # If a pothole is detected, return some data
    if np.random.rand() > 0.5:  # Simulate detection
        return {
            "name": "Detected Pothole",
            "lat": 12.9716,  # Example latitude
            "lng": 77.5946,  # Example longitude
            "intensity": np.random.randint(1, 10)  # Random intensity
        }
    return None

ipadd = "192.168.95.66"

# ESP32 Camera URL (Modify as per your ESP32 IP)
esp32_url = f"http://{ipadd}/camera?"
model = YOLO(r'server\model\pothole.pt')

while True:
    
    # Append timestamp to prevent caching
    url_with_timestamp = esp32_url + str(int(time.time() * 1000))
    
    # Fetch the image from ESP32
    response = requests.get(url_with_timestamp, timeout=5)
    
    # Convert to a NumPy array
    img_array = np.array(bytearray(response.content), dtype=np.uint8)
    
    # Decode the image
    frame = cv2.imdecode(img_array, -1)
    results = model.track(frame, device = 0)

    # Visualize the results on the frame
    annotated_frame = results[0].plot()

    # Display the annotated frame
    cv2.imshow("YOLO11 Tracking", annotated_frame)

        
        
    

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()
