var Airport = function Airport(options) {
  const DEFAULT_MAX_CAPACITY = 3;

  if (options === undefined) options = {};
  if (options.weather === undefined) options.weather = new Weather();
  if (options.maxCapacity === undefined) options.maxCapacity = DEFAULT_MAX_CAPACITY;

  this.MAXIMUM_CAPACITY = options.maxCapacity;
  this.weather = options.weather;
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
