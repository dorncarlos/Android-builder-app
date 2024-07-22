#  Android TV Screenshots

A web application to connect to an Android TV device and capture screenshots remotely.

## Installation

1. **Clone the repository**
   git clone https://github.com/dorncarlos/Android-builder-app.git
2. **Navigate your project**
   cd android-tv-screenshot
3. **install dependencies**
   npm install
   npm start
4. **Run the server**
   node server.js 

## connection

1. Enable developer option and allow wireless debug in your device
2. Make sure your devices are connected to the same WIFI network
3. Go to WIFI settings on your android device and copy the ipv4 address

## usage

Open your web browser and navigate to http://localhost:3002.
Enter the IP address of your Android TV device in the input field.
Click the "Connect" button.
Once connected, click the "Capture" button to take a screenshot.
The screenshot will be displayed on the page, where you can download it
