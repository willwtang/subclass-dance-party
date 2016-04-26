var Fish = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.direction = 'left';
  var context = this;
  this.$node.click(function(event) {
    console.log(this);
    $(this).removeClass('leftFish');
    $(this).addClass('hookedFish');
    context.direction = 'up';
    context.timeBetweenSteps = 10;
  });
};

Fish.prototype = Object.create(makeDancer.prototype);
Fish.prototype.constructor = Fish;

Fish.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  if (this.direction === 'left') {
    this.left += 10;
  } else if (this.direction === 'right') {
    this.left -= 10;
  } else if (this.direction === 'up') {
    this.top -= 10;
  }
  if (this.left > $('body').width()) {
    this.direction = 'right';
    this.$node.addClass('leftFish');
  } 
  if (this.left < 0) {
    this.direction = 'left';
    this.$node.removeClass('leftFish');
  }
  if (this.top < 0) {
    this.$node.remove();
  }
  this.setPosition();
};