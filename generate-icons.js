// This is a Node.js script to generate icons from a base image
// Run with: node generate-icons.js

const sharp = require('sharp'); // npm install sharp
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const baseIcon = 'base-icon.png'; // Your source icon (should be 512x512 or larger)

// Create a simple base icon if it doesn't exist
if (!fs.existsSync(baseIcon)) {
  // Create a simple SVG icon
  const svgIcon = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1976d2;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#42a5f5;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="80" fill="url(#grad1)"/>
      <circle cx="256" cy="200" r="60" fill="white" opacity="0.9"/>
      <rect x="196" y="280" width="120" height="40" rx="20" fill="white" opacity="0.9"/>
      <text x="256" y="380" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="white">PAZ</text>
      <text x="256" y="420" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" opacity="0.8">CLEAR</text>
    </svg>
  `;
  
  fs.writeFileSync('icon.svg', svgIcon);
  console.log('Created base SVG icon');
}

// Generate PNG icons from SVG
async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync('icon.svg');
    
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(`icon-${size}x${size}.png`);
      
      console.log(`Generated icon-${size}x${size}.png`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
