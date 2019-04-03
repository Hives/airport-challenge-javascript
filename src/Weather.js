function Weather() {};

Weather.prototype = {
  constructor: Weather,
  isStormy: function() {
    return Math.random() < 0.25;
  }
};
