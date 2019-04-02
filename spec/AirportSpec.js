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
        var plane = "a plane";
        airport.land(plane)
        expect(airport.planes).toContain(plane);
    });
});
