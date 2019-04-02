describe("Airport", function() {
    it("a new airport should contain no planes", function() {
        var airport = new Airport();
        expect(airport.planes).toEqual([]);
    });

    // As an air traffic controller
    // So I can get passengers to a destination
    // I want to instruct a plane to land at an airport
    it("an airport can land a plane", function() {
        var airport = new Airport();
        var plane = jasmine.createSpy('plane');
        airport.land(plane)
        expect(airport.planes).toContain(plane);
    });

    it ("an airport cannot land a plane that's already landed", function() {
        var airport = new Airport();
        var plane = jasmine.createSpy('plane');
        airport.land(plane);
        expect(function() {
            airport.land(plane);
        }).toThrow("Could not land plane. Plane is already landed.");
    });

    // As an air traffic controller
    // So I can get passengers on the way to their destination
    // I want to instruct a plane to take off from an airport and confirm that it is no longer in the airport
    it("an airport can tell a plane to take off", function() {
        var airport = new Airport();
        var plane1 = jasmine.createSpy('plane1');
        var plane2 = jasmine.createSpy('plane2');
        var plane3 = jasmine.createSpy('plane3');
        airport.land(plane1);
        airport.land(plane2);
        airport.land(plane3);
        airport.takeOff(plane2);
        expect(airport.planes).toContain(plane1);
        expect(airport.planes).toContain(plane3);
        expect(airport.planes).not.toContain(plane2);
    });

    it("an airport cannot tell a plane to take off if it's not there", function() {
        var airport = new Airport();
        var plane1 = jasmine.createSpy('plane1');
        var plane2 = jasmine.createSpy('plane2');
        airport.land(plane1);
        expect(function() {
            airport.takeOff(plane2);
        }).toThrow("Plane could not take off. Plane is not at airport.");

    });
});
