const net = require('net');
const Vector2 = require('../../vector/Vector2.js');
require('../bezier/BezierCurve.js');

const host = '127.0.0.1';
const port = 62765;

module.exports = class BezierSamplerClient {
    socket;
    #buf = [];
    #isDisconnected = false;
    #onReceiveFunction = (data) => {};

    constructor() {
        this.#createSocketConnection();
    }

    #createSocketConnection() {
        this.socket = net.createConnection({
            port: port, 
            host: host,
        }, () => {
            console.log('connected to server');
            this.#isDisconnected = false;
        });
        this.socket.on('close', () => {
            console.log('disconnected from server');
            this.#isDisconnected = true;
        });

        this.socket.on('data', (data) => {
            this.#reveive(data);
        });
    }

    send(unparsedControlPoints, length, amount) {
        var controlPoints = '';
        for(const point of unparsedControlPoints) {
            controlPoints += String(point.x) + ':' + String(point.y) + '|';
        }
        controlPoints = controlPoints.substring(0, controlPoints.length-1);

        this.socket.write(JSON.stringify({controlPoints, length, amount}) + '\n');
    }

    #reveive(data) {
        this.#buf += data;
        const delimiterIndex = data.indexOf(';');
        if(delimiterIndex !== -1) {
            const msg = this.#buf.substr(0, delimiterIndex);
            this.#buf = this.#buf.substr(delimiterIndex+1, this.#buf.length);

            const points = this.#parsePoints(msg);

            this.#onReceiveFunction(points);
        }
    }

    #parsePoints(pointsStr) {
        const midParsedPoints = pointsStr.split('|');
        const parsedPoints = [];

        for(const midParsedPoint of midParsedPoints) {
            const pointStr = midParsedPoint.split(':');
            const x = parseFloat(pointStr[0]);
            const y = parseFloat(pointStr[1]);
            parsedPoints.push(new Vector2(x, y));
        }

        return parsedPoints;
    }

    onReceive(userFunction) {
        this.#onReceiveFunction = userFunction;
    }

    isDisconnected() {
        return this.#isDisconnected;
    }

    close() {
        this.socket.destroy();
    }
}