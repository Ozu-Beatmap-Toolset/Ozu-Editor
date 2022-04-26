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
}
