var Fish = function(top, left, timeBetweenSteps) {
  this.direction = 'east';
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.append($('<div class="fish"></div>'));
  var context = this;
  this.isHooked = false;
  this.$node.click(function(event) {
    context.isHooked = true;
    $(this).find('.fish').removeClass('leftFish').addClass('hookedFish');
    context.direction = 'north';
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
  
  this[this.direction]();

  if (this.left > $('body').width()) {
    this.direction = 'west';
  } 
  if (this.left < 0) {
    this.direction = 'east';
  } 
  if (this.top < 0 && this.isHooked) {
    this.$node.remove();
  }
  if (!this.isHooked) {
    this.changeDirection(this.direction);
  }
  this.setPosition();
};

Fish.prototype.east = function() {
  this.left += 10;
};

Fish.prototype.west = function() {
  this.left -= 10;
};

Fish.prototype.north = function() {
  this.top -= 10;
};

Fish.prototype.south = function() {
  this.top += 10;
};

Fish.prototype.ne = function() {
  this.east();
  this.north();
};

Fish.prototype.nw = function() {
  this.north();
  this.west();
};

Fish.prototype.sw = function() {
  this.south();
  this.west();
};

Fish.prototype.se = function() {
  this.south();
  this.east();
};

Fish.prototype.changeDirection = function(newDir) {
  if (typeof newDir === 'string') {
    var degrees = {
      'ne': '315deg',
      'nw': '225deg',
      'sw': '135deg',
      'se': '45deg',
      'north': '270deg',
      'south': '90deg',
      'east': '0deg',
      'west': '180deg'
    };
    if (newDir === 'west' || newDir === 'nw' || newDir === 'sw') {
      this.$node.children().last().css('transform', 'rotate(' + degrees[newDir] + ') rotateX(180deg)');
    } else {
      this.$node.children().last().css('transform', 'rotate(' + degrees[newDir] + ')');
    }
  } else {
    var left = newDir[0];
    var top = newDir[1];
    var radian = Math.atan2(top, left);
    if (radian > -Math.PI / 2 && radian < Math.PI / 2) {
      this.$node.children().last().css('transform', 'rotate(' + radian + 'rad)');
    } else {
      this.$node.children().last().css('transform', 'rotate(' + radian + 'rad) rotateX(180deg)');
    }
    
  }
};

var BlueYellow = function(top, left, timeBetweenSteps) {
  this.direction = 'ne';  
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.append($('<div class="blueYellow"></div>'));
  this.isHooked = false;
  var context = this;
  this.hooked = '<div class="BYhook"></div>';
  this.$node.unbind().click(function(event) {
    context.isHooked = true;
    $(this).empty();
    $(this).append(context.hooked);
    context.direction = 'north';
    context.timeBetweenSteps = 10;
    $(this).prepend($('<div class="hook"></div>'));
    $(this).unbind();
    //$(this).css('display', 'block');
  });
};

BlueYellow.prototype = Object.create(Fish.prototype);
BlueYellow.prototype.constructor = BlueYellow;

BlueYellow.prototype.step = function() {
  makeDancer.prototype.step.call(this);

  this[this.direction]();

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
    this.$node.remove();
  }

  if (!this.isHooked) {
    this.changeDirection(this.direction);
  }
  this.setPosition();
};

var PurpleBlue = function(top, left, timeBetweenSteps) {
  BlueYellow.call(this, top, left, 100);
  this.direction = 'e';
  this.$node.empty().append($('<div class="purpleBlue"></div>'));
  this.hooked = '<div class="PBhook"></div>';
};

PurpleBlue.prototype = Object.create(BlueYellow.prototype);
PurpleBlue.prototype.constructor = PurpleBlue;

PurpleBlue.prototype.step = function() {
  makeDancer.prototype.step.call(this);

  if (this.left > $('body').width()) {
    this.direction = 'west';
    this.top -= 200;
  } 
  if (this.left < -200) {
    this.direction = 'east';
    this.top -= 200;
  }

  if (!this.isHooked) {
    this.wave();
  } else {
    this.north();
  }
  if (this.top < -100) {
    this.$node.remove();
  }
  this.setPosition();
};

PurpleBlue.prototype.wave = function() {
  var s = Math.sin(this.left / 100);
  var y = 10 * s;
  this.top += y;
  if (this.direction === 'east') {
    this.left += 10;
    this.changeDirection([5, y]);
  } else {
    this.left -= 10;
    this.changeDirection([-5, y]);
  }

};

var Shark = function(top, left, timeBetweenSteps) {
  Fish.call(this, top, left, timeBetweenSteps);
  this.$node.empty().append($('<div class="Shark"></div>'));
  var context = this;
  this.$node.unbind().click(function(event) {
    context.isHooked = true;
    $(this).empty();
    $(this).append('<div class="hookedShark"></div>');
    context.direction = 'north';
    context.timeBetweenSteps = 10;
    $(this).prepend($('<div class="hook"></div>'));
    $(this).unbind();
    //$(this).css('display', 'block');
  });
};

Shark.prototype = Object.create(Fish.prototype);
Shark.prototype.constructor = Shark;

Shark.prototype.step = function() {
  Fish.prototype.step.call(this);
  this.$node.collision('div').find('.fish, .blueYellow, .purpleBlue').remove();
};