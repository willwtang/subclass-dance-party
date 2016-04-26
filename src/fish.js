var Fish = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.direction = 'left';
  this.$node.append($('<div class="fish"></div>'));
  var context = this;
  this.isHooked = false;
  this.$node.click(function(event) {
    context.isHooked = true;
    $(this).find('.fish').removeClass('leftFish').addClass('hookedFish');
    context.direction = 'up';
    context.timeBetweenSteps = 10;
    $(this).prepend($('<div class="hook"></div>'));
    $(this).unbind();
    //$(this).css('display', 'block');
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

var BlueYellow = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.append($('<div class="blueYellow rotate"></div>'));
  this.direction = 'ne';
  this.isHooked = false;
  var context = this;
  this.$node.click(function(event) {
    $(this).find('.blueYellow').remove();
    $(this).append('<div class="BYhook"></div>');
    context.direction = 'up';
    context.timeBetweenSteps = 10;
    $(this).prepend($('<div class="hook"></div>'));
    context.isHooked = true;
    $(this).unbind();
    //$(this).css('display', 'block');
  });
};

BlueYellow.prototype = Object.create(makeDancer.prototype);
BlueYellow.prototype.constructor = BlueYellow;

BlueYellow.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  var degrees = {
    'ne': '315deg',
    'nw': '225deg',
    'sw': '135deg',
    'se': '45deg'
  };
  if (this.direction === 'ne') {
    this.left += 10;
    this.top -= 10;
  } else if (this.direction === 'nw') {
    this.left -= 10;
    this.top -= 10;
  } else if (this.direction === 'se') {
    this.left += 10;
    this.top += 10;
  } else if (this.direction === 'sw') {
    this.left -= 10;
    this.top += 10;
  } else if (this.direction === 'up') {
    this.top -= 10;
  }
  if (this.left > $('body').width()) {
    var approaching = this.direction.charAt(0);
    this.direction = approaching + 'w';
  } 
  if (this.left < 0) {
    var approaching = this.direction.charAt(0);
    this.direction = approaching + 'e';
  }
  if (this.top > $('body').height()) {
    var approaching = this.direction.charAt(1);
    this.direction = 'n' + approaching;
  } 
  if (this.top < 0 && !this.isHooked) {
    var approaching = this.direction.charAt(1);
    this.direction = 's' + approaching;
  } 
  if (this.top < 0 && this.isHooked) {
    console.log('here');
    this.$node.remove();
  }
  if (!this.isHooked) {
    this.$node.find('.blueYellow').css('transform', 'rotate(' + degrees[this.direction] + ')');
  }
  this.setPosition();
};

