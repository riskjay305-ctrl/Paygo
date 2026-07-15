const sharp = require('sharp');
const path = require('path');

// Create SVG with proper dimensions
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#grad1)"/>
  
  <!-- Decorative circles -->
  <circle cx="150" cy="120" r="80" fill="#fbbf24" opacity="0.12"/>
  <circle cx="1050" cy="530" r="110" fill="#fbbf24" opacity="0.1"/>
  <circle cx="600" cy="630" r="150" fill="#fbbf24" opacity="0.05"/>
  
  <!-- Main title -->
  <text x="600" y="220" font-size="80" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="Arial, sans-serif" letter-spacing="1">
    PAYgO Limited
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="310" font-size="32" fill="#fbbf24" text-anchor="middle" font-family="Arial, sans-serif">
    Smart Digital Financial Platform
  </text>
  
  <!-- Features line -->
  <text x="600" y="380" font-size="18" fill="#cbd5e1" text-anchor="middle" font-family="Arial, sans-serif">
    Register • Transfer • Withdraw • Secure Services
  </text>
  
  <!-- Decorative line -->
  <line x1="200" y1="420" x2="1000" y2="420" stroke="#fbbf24" stroke-width="2" opacity="0.3"/>
  
  <!-- Small icons representation -->
  <g opacity="0.8">
    <rect x="250" y="470" width="40" height="40" rx="4" fill="#fbbf24"/>
    <text x="270" y="495" font-size="24" fill="#1e293b" text-anchor="middle" font-family="Arial, sans-serif">💳</text>
  </g>
  
  <g opacity="0.8">
    <rect x="580" y="470" width="40" height="40" rx="4" fill="#fbbf24"/>
    <text x="600" y="495" font-size="24" fill="#1e293b" text-anchor="middle" font-family="Arial, sans-serif">💸</text>
  </g>
  
  <g opacity="0.8">
    <rect x="910" y="470" width="40" height="40" rx="4" fill="#fbbf24"/>
    <text x="930" y="495" font-size="24" fill="#1e293b" text-anchor="middle" font-family="Arial, sans-serif">🔒</text>
  </g>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, '../public/og-image.png'))
  .then(() => {
    console.log('✓ Generated og-image.png (1200x630)');
  })
  .catch(err => {
    console.error('Error generating image:', err);
    process.exit(1);
  });
