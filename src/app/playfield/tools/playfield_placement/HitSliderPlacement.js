const State = require('../../../../util/patterns/state_machine/State.js');
const RealtimeKB = require('../../../../util/user_input/RealtimeKB.js');
const Playfield = require('../../Playfield.js');
const unplacedSlider = require('../../../hit_objects/unplacedSlider.js');
const Vector2 = require('../../../../util/math/vector/Vector2.js');
const HitSliderCloner = require('../../../hit_objects/HitSliderCloner.js');
const AddSliderToPlayfield = require('../../../../util/actions/actions/AddSliderToPlayfield.js');
const BezierSamplerClient = require('../../../../util/math/curve/bezier/BezierSamplerClient.js');
const BezierCurve = require('../../../../util/math/curve/bezier/BezierCurve.js');

const REFRESH_RATE = 2; // ms

var x1;
var x2;

module.exports = class HitSliderPlacement extends State {
    #mouseMoveListenerMethod = (event) => { this.queryBezierSampling(); };
    #uiData;
    #interval;
    #bezierCurve;
    #bezierSamplerClient;
    #cursor;
    #dataReceived = true;
    constructor(uiData, bezierCurve, bezierSamplerClient) {
        super();
        unplacedSlider.getDomObject().style.setProperty('visibility', 'visible');
        this.#uiData = uiData;
        this.#bezierCurve = bezierCurve;
        this.#bezierSamplerClient = bezierSamplerClient;
        this.#bezierSamplerClient.onReceive((data) => {
            this.#dataReceived = true;
            this.#bezierCurve.samples = data;
            x2 = Date.now();
            console.log(x2-x1);
            unplacedSlider.moveLastControlPointTo(this.#cursor.get(), this.#bezierCurve, this.#uiData[0]);
        });

        // start to display the slider
        window.addEventListener('mousemove', this.#mouseMoveListenerMethod);
        //this.#interval = window.setInterval(() => this.queryBezierSampling(), REFRESH_RATE);
    }

    unregister() {
        window.removeEventListener('mousemove', this.#mouseMoveListenerMethod);
        //window.clearInterval(this.#interval);
        unplacedSlider.getDomObject().style.setProperty('visibility', 'hidden');
    }

    start(input) {
        // save the cursor to use it in the callback for the bezier parser
        this.#cursor = input[0][1];

        // add a control point to the curve
        unplacedSlider.addControlPoint(this.#uiData[0].playfieldPositionToOsuPixel(input[0][1].get()), this.#bezierCurve, this.#uiData[0]);
        // move the circle to the cursor for the first frame
        // unplacedSlider.moveLastControlPointTo(this.#cursor.get(), this.#bezierCurve, this.#uiData[0]);

        // display on the first frame
        this.queryBezierSampling();
    }

    exec(input) {
        if (input[1].type == 'mousedown') {
            if (input[1].buttons == 2) { // right click
                const hitSliderCopy = HitSliderCloner.cloneAt(unplacedSlider.getDomObject(), this.#uiData[0], this.#uiData[1].getCurrentPositionOnClosestDivision());
                new AddSliderToPlayfield(this.#uiData[2], hitSliderCopy, this.#uiData[1], this.#uiData[0], this.#bezierCurve).do();
            }
            // left click = add a new control-point
            else if (input[1].buttons == 1) {
                // add a control point to the curve
                unplacedSlider.addControlPoint(this.#uiData[0].playfieldPositionToOsuPixel(input[0][1].get()), this.#bezierCurve, this.#uiData[0]);
            }
        }
    }

    next(input) {
        if (input[0][0].escPressed()) {
            // esc = cancel
            this.#bezierSamplerClient.close();
            unplacedSlider.clearControlPoints();
            this.unregister();
            const IdleTool = require('../IdleTool.js');
            return new IdleTool(this.#uiData);
        }
        if (input[1].type == 'mousedown') {
            // right click = we're done the slider is placed
            if (input[1].buttons == 2) {
                this.#bezierSamplerClient.close();
                unplacedSlider.clearControlPoints();
                this.unregister();
                const IdleTool = require('../IdleTool.js');
                return new IdleTool(this.#uiData);
            }
        }
        return this;
    }

    queryBezierSampling() {
        if(this.#dataReceived) {
            this.#dataReceived = false;

            var arcLength = this.#bezierCurve.arcLength(this.#bezierCurve.length);
            if(isNaN(arcLength)) {
                arcLength = this.#bezierCurve.fastUpperBoundArcLength(this.#bezierCurve.length);
            }
            const amountOfPointsToSample = Math.max(Math.round(arcLength/7), 1);

            this.#bezierSamplerClient.send(this.#bezierCurve.controlPoints, this.#bezierCurve.length, amountOfPointsToSample);
            x1 = Date.now();
        }
    }
}
