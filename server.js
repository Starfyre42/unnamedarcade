const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 8080;

// Serve the /assets directory under the /assets route
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve the /lib directory under the /lib route
app.use('/lib', express.static(path.join(__dirname, 'lib')));

// Serve the /src directory under the /src route
app.use('/src', express.static(path.join(__dirname, 'src')));

// Serve the index.html file as the default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Get the local IP address
const localIP = Object.values(os.networkInterfaces())
  .flat()
  .filter(({ family, internal }) => family === 'IPv4' && !internal)
  .map(({ address }) => address)[0];

// Get the external IP address (requires an external service)
const getExternalIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Unable to fetch external IP address:', error);
    return null;
  }
};

// Start the server
app.listen(PORT, async () => {
    const externalIP = await getExternalIP();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Local IP address: http://${localIP}:${PORT}`);
    if (externalIP) {
      console.log(`External IP address: http://${externalIP}:${PORT}`);
    }
});
