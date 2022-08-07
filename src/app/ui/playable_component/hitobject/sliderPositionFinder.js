//import Vector2 from '../../../../util/math/vector/Vector2.js';

export const findPositionOnSlider = (bCurves, distance) => {
    const samples = [];
    for(const bCurve of bCurves) {
        for(const sample of bCurve.samples) {
            samples.push(sample);
        }
    }

    if(samples.length === 1) {
        return samples[0];
    }

    var totalDistance = 0;
    var lastSeparation = 0;
    var bestI = 1;
    for(var i = 1; i < samples.length; i++) {
        lastSeparation = samples[i-1].distance(samples[i]);
        totalDistance += lastSeparation;
        bestI = i;
        if(totalDistance > distance) break;
    }

    const ratio = (distance-(totalDistance-lastSeparation))/lastSeparation;
    return samples[bestI-1]*(1-ratio) + samples[bestI]*ratio;
}