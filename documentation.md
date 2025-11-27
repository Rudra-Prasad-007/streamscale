# StreamScale: High-Performance Image Processor

**StreamScale** is a lightweight, high-performance Node.js microservice designed for real-time image manipulation. It utilizes **in-memory stream processing** to resize and watermark images on the fly without writing temporary files to the disk, ensuring low latency and high scalability.

## ⚡ Key Features

* **In-Memory Processing:** Utilizes `multer` memory storage and Node.js Buffers to process images in RAM, avoiding slow disk I/O operations.
* **High-Speed Transformation:** Powered by `sharp` (libvips), offering image processing speeds 4x-5x faster than ImageMagick.
* **Dynamic Vector Watermarking:** Generates SVG overlays programmatically, ensuring watermarks remain crisp and pixel-perfect at any resolution.
* **Stateless Architecture:** No databases or file storage required; the service functions as a pure input/output pipeline.
* **Zero-Dependency Frontend:** A clean, vanilla JavaScript interface using the Fetch API and Blob objects for immediate preview.

## 🛠️ Technology Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Server-side JavaScript environment. |
| **Framework** | Express.js | REST API routing and middleware management. |
| **Processing** | Sharp | High-performance image resizing and composition. |
| **Middleware** | Multer | Handling `multipart/form-data` and memory buffering. |
| **Styling** | Tailwind CSS | Utility-first CSS for the frontend interface. |

## ⚙️ Installation & Setup

### Prerequisites
* Node.js (v14.0.0 or higher)
* npm (Node Package Manager)

### Step-by-Step Guide

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/Rudra-Prasad-007/streamscale.git](https://github.com/Rudra-Prasad-007/streamscale.git)
    cd streamscale
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Server**
    ```bash
    node server.js
    ```

4.  **Access the Application**
    Open your browser and navigate to:
    `http://localhost:3000`

## 📡 API Reference

The service exposes a single endpoint for image processing.

### `POST /process`

Uploads an image, resizes it, and applies a text watermark.

**Headers:**
* `Content-Type: multipart/form-data`

**Body Parameters:**

| Parameter | Type | Required | Description | Default |
| :--- | :--- | :--- | :--- | :--- |
| `image` | File | **Yes** | The image file to process (JPEG, PNG, WebP, etc.). | N/A |
| `width` | Integer | No | The target width in pixels. Height is calculated automatically. | `800` |
| `watermark` | String | No | The text to overlay on the image. | `"Node.js Watermark"` |

**Response:**
* **Success (200):** Returns binary image data (`image/jpeg`).
* **Error (400/500):** JSON object containing error details.

#### Example Request (cURL)
```bash
curl -X POST http://localhost:3000/process \
  -F "image=@/path/to/photo.jpg" \
  -F "width=1024" \
  -F "watermark=Confidential" \
  --output processed.jpg
