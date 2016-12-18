var Avatar = Avatar || {};



$(Avatar.start.bind(Avatar));

Avatar.start = function start() {
  $( 'button' ).on( 'click', function(e) {
    console.log('button clicked');
    let buttonPress = e.target.id;
    switch(buttonPress) {
      case 'buttonFeed':
      break;
      case 'buttonExercise':
      break;
      case 'buttonClean':
      break;
      case 'restart':
    }
};
