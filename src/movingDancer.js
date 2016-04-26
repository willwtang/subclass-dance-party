var makeMovingDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.headDirection = 'left';
  this.direction = true;
};

makeMovingDancer.prototype = Object.create(makeDancer.prototype);
makeMovingDancer.prototype.constructor = makeMovingDancer;

makeMovingDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  if (this.direction) {
    this.left += 10;
  } else {
    this.left -= 10;
  }
  if (this.left > 2000 || this.left < 100) this.direction = !this.direction;
  this.setPosition();
  this.shakeHead();
};

makeMovingDancer.prototype.shakeHead = function() {
  this.$node.find('.dancerHead').toggleClass('rightHead').toggleClass('leftHead');
};

makeMovingDancer.prototype.dance = function() {

}