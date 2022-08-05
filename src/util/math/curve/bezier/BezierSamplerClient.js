import Vector2 from '../../vector/Vector2.js';
import './BezierCurve.js';

const host = '127.0.0.1';
const port = '62765';

export default class BezierSamplerClient {
    onReceiveFunction = () => {};

    send(unparsedControlPoints, length, amount) {
        var controlPoints = '';
        for(const point of unparsedControlPoints) {
            controlPoints += String(point.x) + ':' + String(point.y) + '|';
        }
        controlPoints = controlPoints.substring(0, controlPoints.length-1);
        
        fetch(`http://${host}:${port}/bezier_sampler`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br'
            },
            body: JSON.stringify({controlPoints, length, amount}),
        }).then(data => data.text())
        .then(data => this.reveive(data));
    }

    reveive(data) {
        this.buf += data;
        const delimiterIndex = data.indexOf(';');
        if(delimiterIndex !== -1) {
            const msg = this.buf.substr(0, delimiterIndex);
            this.buf = this.buf.substr(delimiterIndex+1, this.buf.length);

            const points = this.parsePoints(msg);

            this.onReceiveFunction(points);
        }
    }

    parsePoints(pointsStr) {
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
        this.onReceiveFunction = userFunction;
    }
}