module.exports = class Vector2 {
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

    decoupledScaled(that) {
        return new Vector2(this.x * that.x, this.y * that.y);
    }

    decoupledInverse() {
        return new Vector2(1/this.x, 1/this.y);
    }

    discreteForm() {
        return new Vector2(Math.round(this.x), Math.round(this.y));
    }

    distanceSquared(that) {
        return this.x*this.x + this.y*this.y;
    }

    distance(that) {
        Math.sqrt(distanceSquared(that));
    }

    static constructFromJson(json) {
        return new Vector2(parseFloat(json.x), parseFloat(json.y));
    }
}
