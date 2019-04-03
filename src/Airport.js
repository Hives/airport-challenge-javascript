var Airport = function Airport(weather) {
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
