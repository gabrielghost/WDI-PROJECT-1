var Brian = Brian || {};

Brian.start = function start() {
  $( 'button' ).on( 'click', function(e) {
    var buttonPress = e.target.innerHTML;
    switch(buttonPress) {
      case 'feed':
        console.log('feed');
        Brian.feed();
        break;
      case 'exercise':
        Brian.train();
        console.log('exercise');
        break;
      case 'clean':
        console.log('clean');
        Brian.wash();
        break;
    }
  });

  // var $loveForm = $('.loveForm');
  // var $textArea = $(':textArea');
  //
  // $loveForm.on('submit', function(e){
  //   e.preventDefault();
  //   if (tweet.text.length > 0 && tweet.text.length < 141){
  // });

  if (this.checkForExistingBrian()) {
    console.log('Loading existing Brian');
    this.loadBrian();
  } else {
    console.log('Hatching new Brian');
    Brian.newGame();
    this.interval  = 1000;
    this.food      = 1000;
    this.exercise  = 1000;
    this.love      = 1000;
    this.clean     = 40;
    this.sleep     = 0;
    this.hatchTime = new Date().getTime();
    this.saveLastSeen();
    this.save();
    this.deathCheck();
  }
  // Show initial age
  this.displayAge();

  setInterval(this.live.bind(this), this.interval);
};

Brian.feed = function(){
  if (this.food >= 1000) {
    this.food=1000;
  } else if (this.food >= 900){
    this.food=1000;
    this.clean = Math.floor(this.clean*(Math.random()/4+0.7));
    console.log(this.food);
  }else{
    this.food = Math.floor(this.food+100);
    this.clean = Math.floor(this.clean*(Math.random()/4+0.7));
    console.log(this.food);
  }
  Brian.valuePush();
};

Brian.deathCheck = function(){
  if ((this.love||this.food||this.exercise)<50){
    Brian.deathFunction();
  } if (this.clean < 10){
    Brian.deathFunction();
  }
};

Brian.deathFunction = function(){
  if (Math.random()>0.98){
    var past = confirm('past avatar detected would you like to load?');
    if (past !== true){
      newGame();
    }
    if (past === true){
      alert('game over');
    }
  }
};

Brian.train = function(){

  console.log(this.exercise);
  if (this.exercise >= 1000){
    this.exercise=1000;
  } else if (this.exercise >= 900) {
    this.exercise=1000;
    this.food =Math.floor(this.food*(Math.random()/6+0.8));
    this.love =Math.floor(this.love*(Math.random()/6+0.8));
    this.clean = Math.floor(this.clean*(Math.random()/6+0.8));
  } else {
    this.exercise =Math.floor(this.exercise+100);
    this.food =Math.floor(this.food*(Math.random()/6+0.8));
    this.love =Math.floor(this.love*(Math.random()/6+0.8));
    this.clean = Math.floor(this.clean*(Math.random()/4+0.7));
  }
  Brian.valuePush();
};

Brian.wash = function(){
  if (this.clean >= 40) {
    this.clean=40;
  } else {
    this.clean= 40;
    this.love =Math.floor(this.love*0.5);
    console.log(this.clean);
  }
  Brian.valuePush();
};

Brian.love = function(){
  this.love=(this.love+100);
  console.log(this.love);
  if (this.love >= 1000) {
    this.clean=1000;
  }
  var $clean = $('.clean');
  $clean.html(this.clean);
  var $food = $('.food');
  $food.html(this.food);
  var $exercise = $('.exercise');
  $exercise.html(this.exercise);
};

Brian.valuePush = function valuePush(){
  var $exercise = $('.exercise');
  $exercise.html(this.exercise);
  var $food = $('.food');
  $food.html(this.food);
  var $clean = $('.clean');
  $clean.html(this.clean);
  var $love = $('.love');
  $love.html(this.love);
};

Brian.live = function live() {
  this.displayAge();
  this.saveLastSeen();
  this.foodDecay();
  this.exerciseDecay();
  this.cleanDecay();
  this.loveDecay();
  // Save every interval...
  this.save();
};

Brian.saveLastSeen = function saveLastSeen() {
  this.lastSeen = new Date().getTime();
};

Brian.foodDecay = function() {
  // Every second, there is a 1 in 30 chance for Brian to get hungry
  var rateOfHunger = 5;
  var hungerChance = Math.floor(Math.random() * rateOfHunger);
  if (hungerChance === 1) {
    // If true, decrease by a random number between 1 & 10% of current hunger
    // Need to check...
    this.food -= Math.floor(Math.random() * (this.food/100*10));
  }

  var $food = $('.food');
  $food.html(this.food);
  console.log(this.love);


};

Brian.loveDecay = function() {
  var $love = $('.love');
  $love.html(this.love);
};

Brian.exerciseDecay = function() {
  // Every second, there is a 1 in 30 chance for Brian to get hungry
  var rateOfExercise = 5;
  var exerciseChance = Math.floor(Math.random() * rateOfExercise);
  if (exerciseChance === 1) {
    // If true, decrease by a random number between 1 & 10% of current hunger
    // Need to check...
    this.exercise -= Math.floor(Math.random() * (this.exercise/100*10));
  }
  var $exercise = $('.exercise');
  $exercise.html(this.exercise);
};

Brian.cleanDecay = function() {
  // Every second, there is a 1 in 30 chance for Brian to get hungry
  var rateOfMess = 5;
  var exerciseChance = Math.floor(Math.random() * rateOfMess);
  if (exerciseChance === 1) {
    // If true, decrease by a random number between 1 & 10% of current hunger
    // Need to check...
    this.clean -= Math.floor(Math.random() * (this.clean/100*10));
  }
  var $clean = $('.clean');
  $clean.html(this.clean);
};

Brian.ageInSeconds = function ageInSeconds(){
  var differenceBetweenHatchTimeAndNow = new Date().getTime() - this.hatchTime;
  return Math.floor(differenceBetweenHatchTimeAndNow/this.interval);
};

Brian.displayAge = function displayAge() {
  this.$age = $('time');
  this.$age.html(this.ageInSeconds());
};

Brian.update = function update() {
  var now               = new Date().getTime();
  var timeElapsed       = now - this.lastSeen;
  var numberOfIntervals = timeElapsed / this.interval;
  var i                 = 0;

  // Run Brian's functions for the number of intervals that have passed
  for (i; i < numberOfIntervals; i++) {
    this.live();
  }
};

Brian.save = function save() {
  console.log(this);
  return window.localStorage.setItem('Brian', JSON.stringify(this));
};

Brian.clear = function clear() {
  return window.localStorage.clear();
};

Brian.checkForExistingBrian = function checkForExistingBrian() {
  return window.localStorage.getItem('Brian');
};

Brian.loadBrian = function loadBrian() {
  var brian = JSON.parse(window.localStorage.getItem('Brian'));
  for (var key in brian) {
    this[key] = brian[key];
  }
  // Change Brian's stats depending on time elapsed
  this.update();
};

$(Brian.start.bind(Brian));
