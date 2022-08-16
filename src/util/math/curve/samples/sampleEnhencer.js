function computeInBetweenPoint(s0, s1, s2, s3) {
    if(s1.distance(s2) < 0.0001) {
        return s1;
    }
    const tangent = s2.minus(s1);
    const middlePoint = tangent.scaled(0.5).plus(s1);
    const normal = tangent.rotate(Math.PI*0.5);
    const intersection0 = s0.minus(middlePoint).projectOnto(normal);
    const intersection1 = s3.minus(middlePoint).projectOnto(normal);
    const pi = (intersection0.plus(intersection1)).scaled(0.5);
    const localResult = pi.scaled(-0.1);
    return middlePoint.plus(localResult);
}

function computeEndpoint(s0, s1, s2) {
    if(s0.distance(s1) < 0.0001) {
        return s0;
    }
    const tangent = s1.minus(s0);
    const middlePoint = tangent.scaled(0.5).plus(s0);
    const normal = tangent.rotate(Math.PI*0.5);
    const intersection = s2.minus(middlePoint).projectOnto(normal);
    const localResult = intersection.scaled(-0.1);
    return middlePoint.plus(localResult);
}

export const getEnhencedCurveSamples = (samples) => {
    if(samples.length < 4) {
        return samples;
    }
    

    const newSamples = [];
    newSamples.push(computeEndpoint(samples[0], samples[1], samples[2]));
    for(let i = 1; i < samples.length-2; i++) {
        newSamples.push(computeInBetweenPoint(samples[i-1], samples[i], samples[i+1], samples[i+2]));
    }
    newSamples.push(computeEndpoint(samples[samples.length-1], samples[samples.length-2], samples[samples.length-3]));

    const result = [];
    result.push(samples[0]);
    for(let j = 1; j < samples.length-1; j++) {
        result.push(newSamples[j-1]);
        result.push(samples[j]);
    }
    result.push(samples[samples.length-1]);


    return result;
}