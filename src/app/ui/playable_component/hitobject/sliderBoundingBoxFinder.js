export const findBoundingBoxFromSamples = (samples, radius) => {
    if(samples.length <= 1) {
        return {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
        };
    }
    var left = samples[0].x;
    var top = samples[0].y;
    var right = samples[0].x;
    var bottom = samples[0].y;

    for(const sample of samples) {
        if(sample.x - radius < left) {
            left = sample.x - radius;
        }
        if(sample.x + radius > right) {
            right = sample.x + radius;
        }
        if(sample.y - radius < top) {
            top = sample.y - radius;
        }
        if(sample.y + radius > bottom) {
            bottom = sample.y + radius;
        }
    }

    return {
        left: left - 1,
        top: top - 1,
        width: right - left + 2,
        height: bottom - top + 2,
    };
}