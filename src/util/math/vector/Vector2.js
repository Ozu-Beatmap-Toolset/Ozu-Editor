export default class Vector2 {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(that) {
        return new Vector2(this.x + that.x, this.y + that.y);
    }

    minus(that) {
        return new Vector2(this.x - that.x, this.y - that.y);
    }

    scaled(factor) {
        return new Vector2(this.x * factor, this.y * factor);
    }

    scaledToMagnitude(magnitude) {
        const currentMagnitude = this.magnitude();
        if(currentMagnitude == 0) {
            return new Vector2(magnitude, 0);
        }
        return this.scaled(magnitude/currentMagnitude);
    }

    decoupledScaled(that) {
        return new Vector2(this.x * that.x, this.y * that.y);
    }

    decoupledInverse() {
        return new Vector2(1/this.x, 1/this.y);
    }

    discreteForm() {
        return new Vector2(Math.round(this.x), Math.round(this.y));
    }

    magnitudeSquared() {
        return this.x*this.x + this.y*this.y;
    }

    magnitude() {
        return Math.sqrt(this.magnitudeSquared());
    }

    dotProduct(that) {
        return this.x*that.x + this.y*that.y;
    }

    distance(that) {
        const x = this.x-that.x;
        const y = this.y-that.y;
        return Math.sqrt(x*x + y*y);
    }

    complexMultiply(that) {
        return new Vector2(this.x*that.x - this.y*that.y, this.x*that.y + this.y*that.x);
    }

    rotate(angle) {
        return this.complexMultiply(new Vector2(Math.cos(angle), Math.sin(angle)));
    }

    angleFrom(that) {
        const beforeAcos = this.dotProduct(that)/(this.magnitude() * that.magnitude());
        if(beforeAcos > 1) {
            return 0;
        }
        if(beforeAcos < -1) {
            return Math.PI;
        }
        return Math.acos(beforeAcos);
    }

    absAngleFrom(that) {
        return Math.abs(this.angleFrom(that));
    }

    static constructFromJson(json) {
        return new Vector2(parseFloat(json.x), parseFloat(json.y));
    }

    isFinite() {
        return isFinite(this.x) && isFinite(this.y);
    }

    projectOnto(that) {
        return that.scaled(this.dotProduct(that)/that.magnitudeSquared());
    }
}