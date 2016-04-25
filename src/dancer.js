// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  // this = Object.create(makeDancer.prototype);

  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  // var dancer = {};

  // // use jQuery to create an HTML <span> tag
  // dancer.$node = $('<span class="dancer"></span>');
  this.$node = $('<div class="dancer"><div class="dancerHead"></div><div class="dancerBody"></div></div>');
  this.step();
  this.setPosition();
  // dancer.step = function() {
  //   // the basic dancer doesn't do anything interesting at all on each step,
  //   // it just schedules the next step
  //   setTimeout(dancer.step, timeBetweenSteps);
  // };
  // dancer.step();
  //console.log(this.__proto__);
  //this.step(timeBetweenSteps);
  // dancer.setPosition = function(top, left) {
  //   // Use css top and left properties to position our <span> tag
  //   // where it belongs on the page. See http://api.jquery.com/css/
  //   //
  //   var styleSettings = {
  //     top: top,
  //     left: left
  //   };
  //   dancer.$node.css(styleSettings);
  // };
  //this.setPosition(top, left);

  // // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // // this one sets the position to some random default point within the body
  // dancer.setPosition(top, left);

  // return dancer;

};

makeDancer.prototype.step = function() {
  var func = this.step.bind(this);
  setTimeout(func, this.timeBetweenSteps);
};

makeDancer.prototype.setPosition = function() {
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
};