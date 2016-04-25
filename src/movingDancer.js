var makeMovingDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.headDirection = 'left';
};

makeMovingDancer.prototype = Object.create(makeDancer.prototype);
makeMovingDancer.prototype.constructor = makeMovingDancer;

makeMovingDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  this.left += 10;
  this.setPosition();
  this.shakeHead();
};

makeMovingDancer.prototype.shakeHead = function() {
  if (this.headDirection === 'right') {
    this.$node.find('.dancerHead').removeClass('rightHead');
    this.$node.find('.dancerHead').addClass('leftHead');
    this.headDirection = 'left';
  } else {
    this.$node.find('.dancerHead').removeClass('leftHead');
    this.$node.find('.dancerHead').addClass('rightHead');
    this.headDirection = 'right';
  }
};