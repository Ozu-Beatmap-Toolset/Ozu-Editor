import JavaRequestHandler from '@/../src/util/client/JavaRequestHandler.js';
import Vector2 from '@/../src/util/math/vector/Vector2.js';
import '@/../src/util/math/curve/bezier/BezierCurve.js';

const host = '127.0.0.1';
const port = '62765';

export default class BezierSamplerClient {
    userFunction = () => {};

    send(unparsedControlPoints, length, amount) {
        let controlPoints = '';
        for(const point of unparsedControlPoints) {
            controlPoints += String(point.x) + ':' + String(point.y) + '|';
        }
        controlPoints = controlPoints.substring(0, controlPoints.length-1);

        let jrh = new JavaRequestHandler();
        jrh.onReceive((data) => {
            const points = this.parsePoints(data);
            this.userFunction(points);
        });
        jrh.send(
            `http://${host}:${port}/bezier_sampler`, 
            JSON.stringify({controlPoints, length, amount})
        );
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

    onReceive(someFunction) {
        this.userFunction = someFunction;
    }
}