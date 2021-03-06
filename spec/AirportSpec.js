describe("Airport", function() {
  var airport, weather, plane1, plane2, plane3, plane4;

  beforeEach(function() {
    weather = {
      isStormy: function() {}
    };
    airport = new Airport({weather: weather});
    plane1 = jasmine.createSpy('plane1');
    plane2 = jasmine.createSpy('plane2');
    plane3 = jasmine.createSpy('plane3');
    plane4 = jasmine.createSpy('plane4');
  });

  describe("initialisation", function() {
    it("a new airport should contain no planes", function() {
      expect(airport.planes).toEqual([]);
    });
  });

  describe(".land", function() {
    describe("when the weather is good", function () {
      beforeEach(function() {
        spyOn(weather, 'isStormy').and.returnValue(false);
      });

      // As an air traffic controller
      // So I can get passengers to a destination
      // I want to instruct a plane to land at an airport
      it("an airport can land a plane that isn't already at the airport", function() {
        airport.land(plane1)
        expect(airport.planes).toContain(plane1);
      });

      it ("an airport can't land a plane that's already at the airport", function() {
        airport.land(plane1);
        expect(function() {
          airport.land(plane1);
        }).toThrow("Could not land plane. Plane is already landed.");
      });

      it ("an airport can't land a plane if it's at maximum capacity", function() {
        airport = new Airport({ weather: weather, maxCapacity: 3 });
        airport.land(plane1);
        airport.land(plane2);
        airport.land(plane3);
        expect(function() {
          airport.land(plane4);
        }).toThrow("Could not land plane. Airport at maximum capacity.");
      });
    });

    describe("when the weather is bad", function() {
      it ("planes can't land", function() {
        spyOn(weather, 'isStormy').and.returnValue(true);
        expect(function() {
          airport.land(plane1);
        }).toThrow("Could not land plane. Weather was stormy.");
      });
    });
  });

  describe(".takeOff", function() {
    describe("when the weather is good", function () {
      beforeEach(function() {
        spyOn(weather, 'isStormy').and.returnValue(false);
      });
      
      // As an air traffic controller
      // So I can get passengers on the way to their destination
      // I want to instruct a plane to take off from an airport and confirm that it is no longer in the airport
      it("an airport can tell a landed plane to take off", function() {
        airport.land(plane1);
        airport.land(plane2);
        airport.land(plane3);
        airport.takeOff(plane2);
        expect(airport.planes).toContain(plane1);
        expect(airport.planes).toContain(plane3);
        expect(airport.planes).not.toContain(plane2);
      });

      it("an airport cannot tell a plane to take off if it's not at the airport", function() {
        airport.land(plane1);
        expect(function() {
          airport.takeOff(plane2);
        }).toThrow("Plane could not take off. Plane is not at airport.");
      });
    });

    // As an air traffic controller 
    // To ensure safety 
    // I want to prevent landing when weather is stormy
    describe("when the weather is bad", function () {
      it ("planes can't take off", function() {
        spyOn(weather, 'isStormy').and.returnValue(false);
        airport.land(plane1)
        weather.isStormy = jasmine.createSpy().and.returnValue(true);
        expect(function() {
          airport.takeOff(plane1);
        }).toThrow("Plane could not take off. Weather was stormy.");
      });
    });

    describe("airport capacity", function() {
      it("the default capacity can be overridden", function() {
        airport = new Airport({ maxCapacity: 2 });
        expect(airport.MAXIMUM_CAPACITY).toEqual(2);
      });

      it("if no maxCapacity is provided it uses the default of 3", function() {
        airport = new Airport();
        expect(airport.MAXIMUM_CAPACITY).toEqual(3);
      });
    });
  });
});
