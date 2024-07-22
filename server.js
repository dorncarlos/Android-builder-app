const express = require('express');
const adb = require('adbkit');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const client = adb.createClient();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/connect', async (req, res) => {
    const ipAddress = req.body.ip;

    try {
        // Attempt to connect to the device via IP address
        await client.connect(ipAddress, 5555);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.post('/capture', async (req, res) => {
    const ipAddress = req.body.ip;

    try {
        const devices = await client.listDevices();
        const device = devices.find(d => d.id.includes(ipAddress));

        if (device) {
            const screenshot = await client.screencap(device.id);
            const filePath = path.join(__dirname, 'public', 'screenshot.png');
            const writeStream = fs.createWriteStream(filePath);

            screenshot.pipe(writeStream).on('finish', () => {
                res.json({ success: true, filePath: '/screenshot.png' });
            }).on('error', (error) => {
                res.json({ success: false, error: error.message });
            });
        } else {
            res.json({ success: false, error: 'Device not found' });
        }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
