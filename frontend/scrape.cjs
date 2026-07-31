const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeUnsplash(query, count) {
  console.log(`Scraping: ${query}`);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set headers to look like a real browser
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  try {
    await page.goto(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Scroll down to load images
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
    await new Promise(r => setTimeout(r, 2000));
    
    const urls = await page.evaluate((cnt) => {
      const images = Array.from(document.querySelectorAll('img[src*="images.unsplash.com/photo-"]'));
      const validUrls = images
          .map(img => img.src)
          .map(src => {
              try {
                const url = new URL(src);
                return url.origin + url.pathname + '?q=80&w=1200&auto=format&fit=crop';
              } catch(e) {
                return null;
              }
          })
          .filter(Boolean);
      return [...new Set(validUrls)].slice(0, cnt);
    }, count);
    
    await browser.close();
    return urls;
  } catch(err) {
    console.error(`Failed to scrape ${query}:`, err.message);
    await browser.close();
    return [];
  }
}

async function run() {
    const categories = [
        { q: 'indian principal', count: 2 },
        { q: 'indian teacher male', count: 4 },
        { q: 'indian teacher female', count: 6 },
        { q: 'indian student', count: 6 },
        { q: 'indian school building', count: 5 },
        { q: 'science lab student', count: 3 },
        { q: 'school library', count: 2 },
        { q: 'indian school sports', count: 3 },
        { q: 'school computer lab', count: 2 },
        { q: 'indian cultural dance', count: 2 },
        { q: 'parents meeting school', count: 2 },
        { q: 'school auditorium', count: 1 },
        { q: 'school bus', count: 1 },
        { q: 'hostel', count: 1 },
        { q: 'school cafeteria', count: 1 },
        { q: 'medical room', count: 1 },
        { q: 'indian school kids', count: 4 },
        { q: 'school event', count: 3 }
    ];
    
    const results = {};
    for (const cat of categories) {
        results[cat.q] = await scrapeUnsplash(cat.q, cat.count);
    }
    
    fs.writeFileSync('scraped_images.json', JSON.stringify(results, null, 2));
    console.log('Done scraping.');
}

run();
