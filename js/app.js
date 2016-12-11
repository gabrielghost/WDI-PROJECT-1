

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
var foodAttr;
var exAttr;
var cleanAttr;
var asleepAttr;
var hatchTime;
var newHatchTime = new Date();

var uiFood = 0;
var uiEx = 0;

//the decay ratios


//clear local storage:
// localStorage.startTime




function start(){

  window.setInterval(age, 1200);
  window.setInterval(death, 120000);
  window.setInterval(animation, 20000);
  window.setInterval(attrDecay, 60000);

  //check if browser has previous game stored
  existingGameCheck();
  function existingGameCheck(){
    if (parseInt(localStorage.oldGame) === 1){
//if so, load data into variables and continue
      hatchTime = localStorage.hatchTime;
      console.log(hatchTime);
      foodAttr = localStorage.foodAttr;
      console.log(foodAttr);
      exAttr = localStorage.exAttr;
      console.log(exAttr);
      cleanAttr = localStorage.cleanAttr;
      console.log(cleanAttr);
      asleepAttr = localStorage.asleepAttr;
      console.log(asleepAttr);
      var past = confirm('past avatar detected would you like to load?');
      if (past !== true){
        newGame();
      }
    }
    loadScreen();
  }

//new game function
  function newGame(){
//reset variables to full
    resetAttr();
//reset manual time counter
    $('.manualAgeTime').val(0);
//push hatchtime to screen
    $('.hatchTime').html('hatch time: '+ hatchTime);
//push age to screen
    age();
//load stats to screen
    loadScreen();
//push new stats to localStorage
    setAttrLoc();
    localStorage.oldGame = 1;
//start hatching function
    // hatch();
  }

//hatching function
//display incubating egg for X period before showing avatar


//resets avatar attributes
  function resetAttr(){
    hatchTime = newHatchTime;
    foodAttr = 10;
    exAttr = 10;
    cleanAttr = 4;
    asleepAttr = 0;
  }

//sets avatar attributes to browser localStorage
  function setAttrLoc(){
    localStorage.hatchTime = hatchTime;
    localStorage.foodAttr = foodAttr;
    localStorage.exAttr = exAttr;
    localStorage.cleanAttr = cleanAttr;
    localStorage.asleepAttr = asleepAttr;
    localStorage.oldGame = 1;
  }

  function age(){
    $('.age').html('age: '+(Math.floor((Date.parse(new Date())-Date.parse(hatchTime))/1000/60))+' minutes');
  }

//   function hatch(){
//   while(parseInt((Date.parse(new Date())-Date.parse(hatchTime))/1000/60)<5){
//     // $('.avatar').attr('src','gifs/chick/eggincubating2.gif');
//     $('.textAvatar').html('egg incubating');
//   }
// }
  function loadScreen(){
    // death();
    $('.food').html('food: '+foodAttr);
    $('.exercise').html('exercise: ' + exAttr);
    $('.clean').html('clean: ' + cleanAttr);
    $('.asleep').html('asleep: ' + asleepAttr);
    setAttrLoc();

    animation();

  }

  function animation(){
    var body = $('.screen');
    var avatar = [
      './gifs/chick/idle3.gif',
      './gifs/chick/idle4.gif'];
    var current = 0;

    function nextBackground() {
      body.html(
        '<img class="avatar" src="'+avatar[current = ++current % avatar.length]+'" alt="" height = "200" width = "200">');
      setTimeout(nextBackground, 10000);
    }
    setTimeout(nextBackground, 10000);
    body.html(
        '<img class="avatar" src="'+avatar[current = ++current % avatar.length]+'" alt="" height = "200" width = "200">');
  }


  // images();
  $('.uiHatchtime').on('input', function(){
    attrDecay();
  });



//button event listeners
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
    var foodFloor = Math.floor(parseInt(Math.floor((Date.parse(new Date())-Date.parse(hatchTime))/1000/60)/60));
    foodAttr = 10 - foodFloor;
    exAttr = 10 - foodFloor;
    // foodAttr = (10+(parseInt(uiFood)) - foodFloor;
    // exAttr = (10+(parseInt(uiEx))) - foodFloor;
    console.log(foodAttr);
    loadScreen();
  }

  function death(){
    if ((parseInt(exAttr) || parseInt(foodAttr))===0){
      $('.dead').html('oh no, brian is dead!');
    }
  }

  function uiFood(){
    if(foodAttr!==10){
      foodAttr++;
    }
    console.log(foodAttr);
    loadScreen();
  }
  function uiExercise(){
    if(exAttr!==10){
      exAttr++;
    }
    console.log(ava.exAttr);
    loadScreen();
  }
  function uiBath(){
    if(cleanAtrr!==4){
      cleanAtrr=4;
    }
    console.log(ava.bathAttr);
    loadScreen();
  }
  function uiSleep(){
    console.log(ava.sleepAttr);
  }

}
