const net = require('net');
require('../bezier/BezierCurve.js');

const host = '127.0.0.1';
const port = 62765;

module.exports = class BezierSamplerClient {
    socket = new net.Socket();
    #onReceiveFunction = (data) => {};

    constructor() {
        this.socket.setEncoding('utf8');
        this.socket.connect(port, host, () => {
            console.log("connected");
        });
        this.socket.on('data', (data) => {
            this.#reveive(data);
        });
    }

    send(controlPoints, length, amount) {

        for(const point of controlPoints) {
            parsedPoints += String(point.x) + ":" + String(point.y) + "|";
        }
        parsedPoints = parsedPoints.substring(0, parsedPoints.length-1);

        this.socket.write(JSON.stringify({parsedPoints, length, amount}) + "\n");
    }

    #reveive(data) {
        this.#onReceiveFunction(data);
    }

    onReceive(userFunction) {
        this.#onReceiveFunction = userFunction;
    }

    close() {
        this.socket.destroy();
    }
}