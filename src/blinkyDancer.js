var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  // var blinkyDancer = makeDancer(top, left, timeBetweenSteps);
  makeDancer.call(this, top, left, timeBetweenSteps);
  // // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // // so we must keep a copy of the old version of this function

  // var oldStep = blinkyDancer.step;

  // blinkyDancer.step = function() {
  //   // call the old version of step at the beginning of any call to this new version of step
  //   oldStep();
  //   // toggle() is a jQuery method to show/hide the <span> tag.
  //   // See http://api.jquery.com/category/effects/ for this and
  //   // other effects you can use on a jQuery-wrapped html tag.
  //   blinkyDancer.$node.toggle();
  // };

  // return blinkyDancer;
};

makeBlinkyDancer.prototype = Object.create(makeDancer.prototype);
makeBlinkyDancer.prototype.constructor = makeBlinkyDancer;

makeBlinkyDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  this.$node.toggle();
};

makeBlinkyDancer.prototype.lineUp = function(top, left) {
  this.top = top;
  this.left = left;
  this.setPosition();
};

makeBlinkyDancer.prototype.checkDistance = function(dancer2) {
  var distance = Math.sqrt(Math.pow(dancer2.top - this.top, 2) + Math.pow(dancer2.left - this.left, 2));
  //if (distance < 2000) {
  this.$node.css('border', '10px solid blue');
  dancer2.$node.css('border', '10px solid blue');
  //}
};