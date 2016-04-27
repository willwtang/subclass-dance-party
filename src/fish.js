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
    var radian;
    if (left === 0 || top === 0) {
      if (left === 0) {
        if (top > 0) {
          radian = Math.PI / 2;
        } else {
          radian = 3 * Math.PI / 2;
        }
      }
      if (top === 0) {
        if (left > 0) {
          radian = 2 * Math.PI;
        } else {
          radian = Math.PI;
        }
      }
    } else {
      var tanVal = Math.atan2(top, left);
      if (top > 0 && left > 0) {
        radian = tanVal;
      } else if (top > 0 && left < 0) {
        radian = tanVal
      } else if (top < 0 && left < 0) {

      } else {

      }
  }
};

var BlueYellow = function(top, left, timeBetweenSteps) {
  this.direction = 'ne';  
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.append($('<div class="blueYellow"></div>'));
  this.isHooked = false;
  var context = this;
  this.$node.unbind().click(function(event) {
    context.isHooked = true;
    $(this).find('.blueYellow').remove();
    $(this).append('<div class="BYhook"></div>');
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

