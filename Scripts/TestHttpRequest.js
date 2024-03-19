const http = require('http');

const postData = JSON.stringify({
  name: 'John Doe',
  comment: 'This is a test comment.'
});

const options = {
  hostname: 'localhost',
  port: 9000,
  path: '/.netlify/functions/submit-comments',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(postData);
req.end();

49665