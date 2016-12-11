//set browser size and format to that of a smartphone screen
//check if browser has cookies stored
//if so, load data into variables and continue
//if no cookies stored then display start button
// log start time into a variable
//upon start load all game variables into local storage so
//upon start an egg appears depending on the local outside temperature egg hatches between 5 secs and 3 minutes ['organism loading' with a %]
//once hatched [hatch animation], displays a little chick
//objective is to keep chick alive
//variables start at full:
//    food = /10
//    love = /10
//    exercise = /10
//    clean = /4
//    asleep = /1

// **optional** randomly generate depletion ratios at launch

// if food || love || exercise = 0 then run death function
// if clean = 4 then run sickness function
// sickness function makes all variables more unpredictable so increases the // need to check frequently
//
// replenishment functions
// when click on food button, replenishes food counter in increments
// when click on clean button, resets the clean counter
//
// depletion functions
// over x amount of time y food decreases
// over x amount of time y love decreases
// over x amount of time y exercise decreases
// over x amount of time y cleanliness decreases
//
// **optional** next level depletion functions
// if fed 1 unit food, x food increases while x exercise decreases
// if fed 1 unit exercise, x food decreases
//
//
// **optional**
// fight function - exports an array of the variables as a hex key "cagefight code" that can be loaded into a page to see who wins a battle
//fight depends on:
//
//density of exercise over last 1/2 day combined with density of exercise over // last 3x days
//
//
//Animation Requirements:
// Egg animation: loading?
// Hatching animation
// 4x duck idling animations
// 1x duck feeding animation
// 1x duck love animation
// 1x duck poo animation
// 3x duck poo positions
// 1x death animation
// 1x graduation animation
//Stats bar:
//    food = /10
//    love = /10
//    exercise = /10
//    age
//
//Rendering options:
//1. gifs
//2. dot matrix screen simulation loaded as an array
//
//User input:
//
//- Feed (food logo)
//- exercise (exercise logo)
//- sleep (sleep logo)
//- wash (bath logo)
//- love (love logo)
//

$(start);

var ava = ava || {};

//declaring the stat variables
ava.foodAttr = 10;
ava.loveAttr = 10;
ava.exAttr = 10;
ava.cleanAttr = 4;
ava.asleepAttr = 0;
ava.NewHatchTime = new Date();
ava.hatchTime;
//the decay ratios


//clear local storage:
// localStorage.startTime

function start(){
  // localStorage.startTime = undefined;

  existingGameCheck();
  function existingGameCheck(){
    if (localStorage.oldGame === 1){
      ava.startTime = localStorage.startTime;
      ava.foodAttr = localStorage.foodAttr;
      ava.loveAttr = localStorage.loveAttr;
      ava.exAttr = localStorage.exAttr;
      ava.cleanAttr = localStorage.cleanAttr;
      ava.asleepAttr = localStorage.asleepAttr;
      var past = confirm('past avatar detected would you like to load?');
      if (past != true){
        newGame();
      }
    }
    loadScreen();
  }


  function newGame(){
    ava.HatchTime = ava.NewHatchTime;
    ava.foodAttr = 10;
    ava.loveAttr = 10;
    ava.exAttr = 10;
    ava.cleanAttr = 4;
    ava.asleepAttr = 0;
    $('.uiHatchtime').val(0);
    $('.autoTime').html('auto time: '+ ava.hatchTime);
    loadScreen();
    localStorage.oldGame = 1;
  }


  function loadScreen(){
    // death();
    $('.food').html('food: '+ava.foodAttr);
    localStorage.foodAttr = ava.foodAttr;
    // console.log(ava.foodAttr);
    $('.love').html('love: ' + ava.loveAttr);
    localStorage.loveAttr = ava.loveAttr;
    // console.log(ava.loveAttr);
    $('.exercise').html('exercise: ' + ava.exAttr);
    localStorage.exAttr = ava.exAttr;
    // console.log(ava.exAttr);
    $('.clean').html('clean: ' + ava.cleanAttr);
    localStorage.cleanAttr = ava.cleanAttr;
    // console.log(ava.cleanAttr);
    $('.asleep').html('asleep: ' + ava.asleepAttr);
    localStorage.asleepAttr = ava.asleepAttr;
    // console.log(ava.exAttr);
    // $('.hatchTime').html('time since hatched: ' + ava.hatchTime);
    // console.log(ava.hatchTime);
  }

  $('.uiHatchtime').on('input', function(){
    attrDecay();
  });

  $('button').on('click', function(e){
    var buttonPress = e.target.innerHTML;
    switch(buttonPress) {
      case 'food':
        console.log('food button');
        uiFood();
        break;
      case 'exercise':
        console.log('exercise button');
        uiExercise();
        break;
      case 'bath':
        console.log('bath button');
        uiBath();
        break;
      case 'love':
        console.log('love button');
        uiLove();
        break;
      case 'sleep':
        console.log('sleep button');
        uiSleep();
        break;
      case 'reset':
        console.log('reset button');
        var R = confirm('are you sure you want to start again?');
        if (R === true){
          newGame();
        }else{
          return;
        }
        break;
    }
  });

  function attrDecay(){
    ava.foodFloor = Math.floor(parseInt($('.uiHatchtime').val()/60));
    ava.foodAttr = 10 - ava.foodFloor;
    ava.loveAttr = 10 - ava.foodFloor;
    ava.exAttr = 10 - ava.foodFloor;
    console.log(ava.foodAttr);
    loadScreen();
  }
  //
  // function death(){
  //   if ((parseInt(ava.foodAttr) || parseInt(ava.loveAttr) || parseInt(ava.exAttr)) =< 0){
  //     $('.dead').html('oh no, brian is dead!');
  //   }
  // }

  function uiFood(){
    if(ava.foodAttr!==10){
      ava.foodAttr++;
      ava.lastInt = new Date();
    }
    console.log(ava.foodAttr);
    loadScreen();
  }
  function uiExercise(){
    if(ava.exAttr!==10){
      ava.exAttr++;
      ava.lastInt = new Date();
    }
    console.log(ava.exAttr);
    loadScreen();
  }
  function uiBath(){
    if(ava.cleanArrt!==4){
      ava.exBath=4;
      ava.lastInt = new Date();
    }
    console.log(ava.bathAttr);
    loadScreen();
  }
  function uiLove(){
    if(ava.loveAttr!==10){
      ava.exLove++;
      ava.lastInt = new Date();
    }
    console.log(ava.loveAttr);
    loadScreen();
  }
  function uiSleep(){
    console.log(ava.sleepAttr);
    ava.lastInt = new Date();
  }

}
