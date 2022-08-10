import BezierSamplerClient from "@/../src/util/math/curve/bezier/BezierSamplerClient.js";
import IPlayfieldTool from "@/../src/app/ui/widget/playfield/tools/IPlayfieldTool.js";
import BezierCurve from "@/../src/util/math/curve/bezier/BezierCurve.js";
import { uuid } from "@/../src/util/uuid/uuid.js"
import CursorPosition from "@/../src/util/user_input/CursorPosition.js"
import { ToolType } from "@/../src/app/ui/widget/playfield/tools/ToolTypeEnum.js";


const MAX_REFRESH_RATE = 16;

export default class HitobjectPlacementTool extends IPlayfieldTool {
    mouseCursor;
    bezierSamplerClient;
    bezierCurve;
    key;
    isWorking;
    lastTime;
    now;
    hitObjects;
    constructor(hitObjects) {
        super();
        this.now = Date.now();
        this.key = uuid();

        this.mouseCursor = new CursorPosition();
        this.hitObjects = hitObjects;

        this.bezierCurve = new BezierCurve([this.mouseCursor.get()]);
        this.bezierCurve.samples = [this.bezierCurve.controlPoints[0]];
        
        this.isWorking = false;

        this.bezierSamplerClient = new BezierSamplerClient();
        this.bezierSamplerClient.onReceive(data => {
            this.bezierCurve.samples = data;
            this.isWorking = false;
            
            const lastHitObjectId = this.hitObjects.length-1;
            this.hitObjects[lastHitObjectId].id = uuid();
        });

        this.hitObjects.push({
            bezierCurves: [this.bezierCurve],
            id: this.key,
            headDistance: 0,
            opacity: 1,
        });
    }

    unregister() {
        this.mouseCursor.unregister();

        const lastHitObjectId = this.hitObjects.length-1;
        const lastBezierId = this.hitObjects[lastHitObjectId].bezierCurves.length-1;
        this.hitObjects[lastHitObjectId].bezierCurves[lastBezierId].controlPoints.pop();
        if(this.hitObjects[lastHitObjectId].bezierCurves[lastBezierId].controlPoints.length === 0) {
            this.hitObjects[lastHitObjectId].bezierCurves.pop();
            if(this.hitObjects[lastHitObjectId].bezierCurves.length === 0) {
                this.hitObjects.pop();
            }
        }
        if(this.hitObjects.length === lastHitObjectId+1) {
            this.sendSampleRequest();
        }
    }

    name() {
        return ToolType.HitObjectPlacement;
    }

    mouseDown(event) {
        if(event.button == 0) {
            this.bezierCurve.controlPoints.push(this.mouseCursor.get());
            if(!this.isWorking) {
                this.sendSampleRequest();
                this.isWorking = true;
            }
        }
        else if(event.button == 2) {
            // stuff
        }
    }

    mouseMove(mouseListener) {
        this.now = Date.now();
        if(this.now - this.lastTime < MAX_REFRESH_RATE) return;
        this.lastTime = this.now;

        const lastHitObjectId = this.hitObjects.length-1;
        const lastBezierId = this.hitObjects[lastHitObjectId].bezierCurves.length-1
        const lastControlPointId = this.hitObjects[lastHitObjectId].bezierCurves[lastBezierId].controlPoints.length-1;
        this.hitObjects[lastHitObjectId]
            .bezierCurves[lastBezierId]
            .controlPoints[lastControlPointId] = mouseListener.get();
        if(this.bezierCurve.controlPoints.length > 0) {
            if(this.bezierCurve.controlPoints.length > 1) {
                if(!this.isWorking) {
                    this.sendSampleRequest();
                    this.isWorking = true;
                }
            }
            else {
                this.hitObjects[lastHitObjectId]
                    .bezierCurves[lastBezierId]
                    .samples[0] = this.mouseCursor.get();
                this.hitObjects[lastHitObjectId].id = uuid();
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