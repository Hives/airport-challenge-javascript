
var Airport = function Airport(weather) {
  const MAXIMUM_CAPACITY = 3;
  this.MAXIMUM_CAPACITY = MAXIMUM_CAPACITY;
  this.weather = weather;
  this.planes = [];
}

Airport.prototype = {
  constructor: Airport,

  land: function(plane) {
    if (this.weather.isStormy()) {
      throw "Could not land plane. Weather was stormy.";
    };
    if (this.planes.includes(plane)) {
      throw "Could not land plane. Plane is already landed.";
    };
    if (this.planes.length === this.MAXIMUM_CAPACITY) {
      throw "Could not land plane. Airport at maximum capacity.";
    };

    this.planes.push(plane);
  },

  takeOff: function(plane) {
    if (this.weather.isStormy()) {
      throw "Plane could not take off. Weather was stormy.";
    };
    if (!this.planes.includes(plane)) {
      throw "Plane could not take off. Plane is not at airport.";
    };

    var index = this.planes.indexOf(plane);
    this.planes.splice(index, 1);
  }
}
