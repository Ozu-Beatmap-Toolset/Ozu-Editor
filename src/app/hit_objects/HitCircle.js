module.exports = class HitCircle {
    static circleId = 1;

    static cloneAt(domCircle, positionOnMeasureBar) {
      const copy = domCircle.cloneNode(false);
      copy.classList.remove('unplaced-circle');
      copy.classList.add('placed-circle');
      copy.classList.add('hit-object');
      copy.id = (HitCircle.circleId++).toString();
      copy.style.setProperty('--measure-bar-position', positionOnMeasureBar);
      return copy;
    }
}
