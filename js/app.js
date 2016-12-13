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
      case 'restart':
        var restartAlert = confirm('are you sure you want to abort your wonderful chick and just like a phoenix spawn another?');
        if (restartAlert === true){
          console.log('restart');
          Brian.newGame();
        }
    }
  });

  this.$loveForm = $('.loveForm');

  this.$loveForm.on('submit',function(e){
    e.preventDefault();
    this.$loveFormEntry = {
      created_at: new Date(),
      text: $('textarea').val()
    };
    if(this.$loveFormEntry.text.length>400){
      this.$ol = $('.comments');
      this.$loveFormEntry = '<li>'+new Date()+'<br>'+$('textarea').val()+'<li>';
      Brian.luv();
      this.$ol.prepend(this.$loveFormEntry);
      $('textarea').val('');
    }
  });

  $('#loveChat').on('keyup', function(){
    // WE CHECK THE LENGTH OF THE TEXT AND SUBTRACT IT FROM 140 TO GET THE NUMBER OF CHARACTERS LEFT
    $('.characterCounter').html($('textarea').val().length-400);
    // WE CONDITIONALLY UPDATE THE COLOR OF THE TEXT TO REFLECT WHETHER IT IS OK TO POST OF NOT (RED IF YOU HAVE GONE OVER THE LIMIT)
    if ($('textarea').val().length < 400){
      $('.characterCounter').css('color', '#cc8787');
    } else {
      $('.characterCounter').css('color', '#8899a6');
    }
  });


//hatching function
//display no attributes for length of time hatching
// display incubating egg gif on screen
// have incubation last between 1-15 minutes (seconds)

  Brian.hatch = function() {

    if (parseInt(this.conceptionTimeInSeconds())>(5)){
      console.log(this.conceptionTimeInSeconds());
      this.$screen = $('.screen');

      Brian.hidePoo();
      this.$screen.css('background-image', '../images/cartoon_natural_landscape_vector_278572.jpg');
      this.$screen.removeAttr('background-image', '../gifs/chick/eggincubating2.gif');
    } else {
      this.$avatar = $('.avatar');
      this.$avatar.attr('src','./gifs/chick/idle3.gif');
    }
  };

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
  }
  // Show initial age
  this.displayAge();

  setInterval(this.live.bind(this), this.interval);
};

Brian.newGame = function(){
  this.newAttributes();
  this.saveLastSeen();
  this.save();
  Brian.valuePush();
  Brian.hatch();
  Brian.hidePoo();
};

Brian.newAttributes= function newAttributes(){
  this.interval  = 1000;
  this.food      = 1000;
  this.exercise  = 1000;
  this.love      = 1000;
  this.clean     = 40;
  this.sleep     = 0;
  this.hatchTime = new Date().getTime();
  this.conceptionTime = new Date().getTime();
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
  if (((parseInt(this.food)||parseInt(this.clean)||parseInt(this.exercise))<50)||(parseInt(this.clean) < 10)){
    console.log('deathCheck qualified1');
    if (Math.random()>0.98){
      // var deathAudio = new Audio('./audio/8-bit Chopin Funeral March.mp3');
      // deathAudio.play();
      var $screen = $('.screen');
      $screen.html('<img class="avatar" src="./gifs/chick_death.gif" alt="" height = "200" width = "200">');
      var past = confirm('brian has died would you like to restart?');
      if (past !== true){
        Brian.newGame();
      }
      if (past === true){
        Brian.newGame();

      }
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
  Brian.hidePoo();
};

Brian.luv = function(){
  this.love=(this.love+300);
  console.log(this.love);
  if (this.love >= 1000) {
    this.clean=40;
  }
  Brian.valuePush();
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
  this.cleanMess();
  this.loveDecay();
  this.deathCheck();
  this.hatch();
  this.foodStat();
  // Save every interval...
  this.save();
};

Brian.cleanMess = function cleanMess() {
  if (parseInt(30)>=parseInt(this.clean) && parseInt(this.clean)>=parseInt(20)){
    Brian.showPoo(1);
  }else if (parseInt(20)>parseInt(this.clean) && parseInt(this.clean)>=parseInt(10)){
    Brian.showPoo(2);
  } else if (parseInt(this.clean)<parseInt(10)){
    Brian.showPoo(3);
  }
};

Brian.foodStat = function foodStat() {
  if (parseInt(1000)>=parseInt(this.food) && parseInt(this.food)>=parseInt(800)){
    console.log('foodstat 5 working');
    Brian.showFoodStat(5);
  }else if (parseInt(800)>parseInt(this.food) && parseInt(this.food)>=parseInt(600)){
    console.log('foodstat 4 working');
    Brian.showFoodStat(4);
  }else if (parseInt(600)>parseInt(this.food) && parseInt(this.food)>=parseInt(400)){
    console.log('foodstat 3 working');
    Brian.showFoodStat(3);
  }else if (parseInt(400)>parseInt(this.food) && parseInt(this.food)>=parseInt(200)){
    console.log('foodstat 2 working');
    Brian.showFoodStat(2);
  }else if (parseInt(200)>parseInt(this.food) && parseInt(this.food)>=parseInt(0)){
    console.log('foodstat 1 working');
    Brian.showFoodStat(1);
  }
};

Brian.showFoodStat = function showFoodStat(f) {
  $('#foodstat').attr('src','./images/foodstat/'+f+'apples.png');
};

Brian.showPoo = function showPoo(p) {
  for (var x = 0; x < p; x++) {
    $('#poo'+(x+1)).css('visibility', 'visible');
  }
};

Brian.hidePoo = function hidePoo() {
  $('#poo1').css('visibility', 'hidden');
  $('#poo2').css('visibility', 'hidden');
  $('#poo3').css('visibility', 'hidden');
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
  // Every second, there is a 1 in 5 chance for Brian to get messy
  var rateOfMess = 5;
  var exerciseChance = Math.floor(Math.random() * rateOfMess);
  if (exerciseChance === 1) {
    // If true, decrease by a random number between 1 & 10% of current hunger
    // Need to check...
    this.clean -= Math.floor(Math.random() * (this.clean/100*10));
  }
  var $clean = $('.clean');
  $clean.html(this.clean);
  Brian.cleanMess();
};

Brian.ageInSeconds = function ageInSeconds(){
  var differenceBetweenHatchTimeAndNow = new Date().getTime() - this.hatchTime;
  return Math.floor(differenceBetweenHatchTimeAndNow/this.interval);
};

Brian.conceptionTimeInSeconds = function conceptionTimeInSeconds(){
  var differenceBetweenConceptionTimeAndNow = new Date().getTime() - this.conceptionTime;
  return Math.floor(differenceBetweenConceptionTimeAndNow/this.interval);
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
