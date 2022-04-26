function getPositionOfHitObject(domHitObject) {
    const valueStr = domHitObject.style.getPropertyValue('--measure-bar-position');
    return parseFloat(valueStr);
}

module.exports = {
    getPositionOfHitObject
}
