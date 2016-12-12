var Brian = Brian || {};

Brian.start = function start() {
  if (this.checkForExistingBrian()) {
    console.log('Loading existing Brian');
    this.loadBrian();
  } else {
    console.log('Hatching new Brian');
    this.interval  = 1000;
    this.food      = 1000;
    this.exercise  = 1000;
    this.clean     = 100;
    this.sleep     = 0;
    this.hatchTime = new Date().getTime();
    this.saveLastSeen();
    this.save();
  }
  // Show initial age
  this.displayAge();

  setInterval(this.live.bind(this), this.interval);
};

Brian.live = function live() {
  this.displayAge();
  this.saveLastSeen();
  this.hunger();
  // Save every interval...
  this.save();
};

Brian.saveLastSeen = function saveLastSeen() {
  this.lastSeen = new Date().getTime();
};

Brian.hunger = function() {
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
