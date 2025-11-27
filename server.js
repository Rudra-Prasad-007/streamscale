const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit to 10MB
});

app.use(express.static(path.join(__dirname, 'public')));

function createTextSVG(text, width, height, fontSize = 40) {
    return `
    <svg width="${width}" height="${height}">
        <style>
            .title { fill: rgba(255, 255, 255, 0.6); font-size: ${fontSize}px; font-weight: bold; font-family: sans-serif; }
        </style>
        <text x="50%" y="90%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
}


app.post('/process', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Please upload an image.');
        }

        const watermarkText = req.body.watermark || 'Node.js Watermark';
        const targetWidth = parseInt(req.body.width) || 800; // Default width 800px

       
        const metadata = await sharp(req.file.buffer).metadata();

     
        const aspectRatio = metadata.height / metadata.width;
        const targetHeight = Math.round(targetWidth * aspectRatio);

     
        const fontSize = Math.floor(targetWidth * 0.05); 
        const svgBuffer = Buffer.from(createTextSVG(watermarkText, targetWidth, targetHeight, fontSize));

       
        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(targetWidth)
            .composite([
                {
                    input: svgBuffer,
                    gravity: 'south', 
                },
            ])
            .jpeg({ quality: 90 }) 
            .toBuffer();

        // Send the image back to the browser
        res.set('Content-Type', 'image/jpeg');
        res.send(processedImageBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing image.');
    }
});

app.listen(port, () => {
    console.log(`📸 Image Processor running at http://localhost:${port}`);
});