const https = require('https');
const fs = require('fs');

function fetchDDG(query) {
    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'html.duckduckgo.com',
            path: '/html/?q=' + encodeURIComponent('site:unsplash.com ' + query),
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const regex = /https:\/\/unsplash\.com\/photos\/([a-zA-Z0-9\-]+)/g;
                const matches = [];
                let match;
                while ((match = regex.exec(data)) !== null) {
                    if (match[1].length > 10 && !match[1].includes('login') && !match[1].includes('search')) {
                        matches.push(match[1]);
                    }
                }
                resolve([...new Set(matches)]);
            });
        });
        req.on('error', reject);
        req.end();
    });
}

async function run() {
    const queries = [
        'indian principal', 'indian teacher man', 'indian teacher woman', 'indian student', 
        'indian school building', 'science lab student', 'indian school library', 
        'indian school cricket', 'school computer lab', 'indian cultural dance', 
        'indian parents school', 'school auditorium', 'school bus', 'school event'
    ];
    
    const results = {};
    for (const q of queries) {
        console.log('Searching:', q);
        const ids = await fetchDDG(q);
        results[q] = ids;
        await new Promise(r => setTimeout(r, 2000));
    }
    fs.writeFileSync('ddg_images.json', JSON.stringify(results, null, 2));
    console.log('Done.');
}
run();
