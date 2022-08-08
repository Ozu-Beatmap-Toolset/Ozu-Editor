export const findPositionOnSlider = (samples, distance) => {
    if(samples.length === 1) {
        return samples[0];
    }

    var totalDistance = 0;
    var lastSeparation = 0;
    var bestI;
    for(var i = 1; i < samples.length; i++) {
        lastSeparation = samples[i-1].distance(samples[i]);
        totalDistance += lastSeparation;
        bestI = i;
        if(totalDistance > distance) break;
    }

    const ratio = (distance-(totalDistance-lastSeparation))/lastSeparation;
    // cap the head at the end of the slider
    if(ratio > 1) return samples[bestI];
    return samples[bestI-1].scaled(1-ratio).plus(samples[bestI].scaled(ratio));
}