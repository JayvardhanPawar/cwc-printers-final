import fs from 'fs';

// 1. Read your data
const products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf8'));

const baseUrl = 'https://ecompusell.com/products/'; 

// 2. Build the XML structure
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ecompusell.com/</loc>
    <priority>1.0</priority>
  </url>
  ${products.map(p => `
  <url>
    <loc>${baseUrl}${p.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

// 3. Save to the public folder
try {
    fs.writeFileSync('./public/sitemap.xml', sitemap);
    console.log('✅ Success: sitemap.xml generated in /public');
} catch (err) {
    console.error('❌ Error:', err);
}