var Airport = function Airport() {
    this.planes = [];
}
Airport.prototype.land = function(plane) {
    if (this.planes.includes(plane)) {
        throw "Could not land plane. Plane is already landed.";
    };

    this.planes.push(plane);
}
Airport.prototype.takeOff = function(plane) {
    if (!this.planes.includes(plane)) {
        throw "Plane could not take off. Plane is not at airport.";
    };

    this.planes -= [plane];
}
