const net = require('net');
require('../bezier/BezierCurve.js');

const host = '127.0.0.1';
const port = 62765;

module.exports = class BezierSamplerClient {
    #socket = new net.Socket();
    
    constructor(bezierCurve, amount) {
        this.#socket.connect(port, host, () => {
            console.log("connected");
            this.#socket.write(bezierCurve.toJsonString() + "\n");
        });
    }

    onReceive(userFunc) {
        this.#socket.on('data', (data) => {
            userFunc(data);
        });
    }

    close() {
        this.#socket.destroy();
    }
}