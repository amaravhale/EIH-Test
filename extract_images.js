const https = require('https');

https.get('https://www.empirisys.io', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const regex = /<img[^>]*src=["'](.*?)["']/gi;
    let match;
    const images = [];
    while ((match = regex.exec(data)) !== null) {
      images.push(match[1]);
    }
    console.log(images.join('\n'));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
