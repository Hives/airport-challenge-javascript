describe("Airport", function() {
    it("a new airport should contain no planes", function() {
        var airport = new Airport();
        expect(airport.planes).toEqual([]);
    });
});
