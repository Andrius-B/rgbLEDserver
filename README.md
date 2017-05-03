# rgbLEDserver
This is me messing around with the idea of reproducing the wirelessly controlled rgb light that Kaunas City fountain has.
It runs a node server in the back end, and the led is controlled by an arduino, which takes care of multiplexing

To launch this, after connecting and arranging the arduino/led, update run npm update on this repo to fetch express
and start the server by runnin app.js
It requires root, because serial ports just do that -_-

also the UI is on the static file accesible through /clr.html of your server
