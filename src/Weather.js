function Weather() {
  this.CHANCE_OF_BAD_WEATHER = 0.25;
};

Weather.prototype = {
  constructor: Weather,
  
  isStormy: function() {
    return Math.random() < this.CHANCE_OF_BAD_WEATHER;
  }
};
