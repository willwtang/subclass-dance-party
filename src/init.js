$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });
  $('.lineUp').on('click', function(event) {
    var left = 100;
    var top = 30;
    for (var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].lineUp(top, left);
      top += 30;
    }
  });
  $('.checkDistance').on('click', function(event) {
    for (var i = 0; i < window.dancers.length; i++) {
      for (var j = 0; j < window.dancers.length; j++) {
        if (i !== j) {
          window.dancers[i].checkDistance(window.dancers[j]);
        }
      }
    }
  });
  $('body').find('.dancer').on('mouseover', function(event) {
    console.log('HERE');
    this.css('border', '10px solid yellow');
  });
});

