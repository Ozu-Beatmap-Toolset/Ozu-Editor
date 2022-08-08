import BezierSamplerClient from "@/../src/util/math/curve/bezier/BezierSamplerClient.js";
import IPlayfieldTool from "@/../src/app/ui/playfield/tools/IPlayfieldTool.js";
import { appData } from '@/../src/util/globals/GlobalData.js';
import BezierCurve from "@/../src/util/math/curve/bezier/BezierCurve.js";
import { uuid } from "@/../src/util/uuid/uuid.js"


const MAX_REFRESH_RATE = 16;

export default class HitobjectPlacementTool extends IPlayfieldTool {
    mouseCursor;
    bezierSamplerClient;
    bezierCurve;
    key;
    isWorking;
    lastTime;
    now;
    constructor() {
        super();
        this.now = Date.now();

        this.bezierCurve = new BezierCurve([appData.userInput.mouseCursor.get()]);
        this.bezierCurve.samples = [this.bezierCurve.controlPoints[0]];
        
        this.isWorking = false;

        this.bezierSamplerClient = new BezierSamplerClient();
        this.bezierSamplerClient.onReceive(data => {
            this.bezierCurve.samples = data;
            this.isWorking = false;
            
            const lastHitObjectId = appData.playfield.hitobjects.length-1;
            appData.playfield
                .hitobjects[lastHitObjectId]
                .id = uuid();
        });

        appData.playfield.hitobjects.push({
            bezierCurves: [this.bezierCurve],
            id: this.key,
            headDiameter: 100,
            headDistance: 0,
            opacity: 1,
        });
    }

    unregister() {
        const lastHitObjectId = appData.playfield.hitobjects.length-1;
        const lastBezierId = appData.playfield.hitobjects[lastHitObjectId].bezierCurves.length-1
        appData.playfield
            .hitobjects[lastHitObjectId]
            .bezierCurves[lastBezierId]
            .controlPoints.pop();
        if(appData.playfield
                .hitobjects[lastHitObjectId]
                .bezierCurves[lastBezierId]
                .controlPoints.length === 0) {
            appData.playfield
                .hitobjects[lastHitObjectId]
                .bezierCurves.pop();
            if(appData.playfield
                    .hitobjects[lastHitObjectId]
                    .bezierCurves.length === 0) {
                appData.playfield.hitobjects.pop();
            }
        }
        if(appData.playfield.hitobjects.length === lastHitObjectId+1) {
            this.sendSampleRequest();
        }
    }

    name() {
        return 'hitobject';
    }

    mouseDown(event) {
        if(event.button == 0) {
            this.bezierCurve.controlPoints.push(appData.userInput.mouseCursor.get());
            this.sendSampleRequest();
        }
        else if(event.button == 2) {
            // stuff
        }
    }

    mouseMove() {
        this.now = Date.now();
        if(this.now - this.lastTime < MAX_REFRESH_RATE) return;
        this.lastTime = this.now;

        const lastHitObjectId = appData.playfield.hitobjects.length-1;
        const lastBezierId = appData.playfield.hitobjects[lastHitObjectId].bezierCurves.length-1
        const lastControlPointId = appData.playfield.hitobjects[lastHitObjectId].bezierCurves[lastBezierId].controlPoints.length-1;
        appData.playfield
            .hitobjects[lastHitObjectId]
            .bezierCurves[lastBezierId]
            .controlPoints[lastControlPointId] = appData.userInput.mouseCursor.get();
        if(this.bezierCurve.controlPoints.length > 0) {
            if(this.bezierCurve.controlPoints.length > 1) {
                if(!this.isWorking) {
                    this.sendSampleRequest();
                    this.isWorking = true;
                }
            }
            else {
                appData.playfield
                    .hitobjects[lastHitObjectId]
                    .bezierCurves[lastBezierId]
                    .samples[0] = appData.userInput.mouseCursor.get();
                appData.playfield
                    .hitobjects[lastHitObjectId]
                    .id = uuid();
            }
        }
    }

    sendSampleRequest() {
        if(this.bezierCurve.controlPoints.length === 2) {
            this.bezierSamplerClient.send(this.bezierCurve.controlPoints, 2, 2);
        }
        else {
            const upperBoundArcLength = this.bezierCurve.fastUpperBoundArcLength();
            var amountOfPoints = Math.max(Math.round(upperBoundArcLength/30), 1);
            if(amountOfPoints > 400) {
                amountOfPoints = 400;
            }
            this.bezierSamplerClient.send(this.bezierCurve.controlPoints, 1, amountOfPoints);
        }
    }
}