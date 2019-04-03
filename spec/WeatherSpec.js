describe("Weather", function() {
  var weather

  beforeEach(function() {
    weather = new Weather();
  });

  describe(".isStormy", function() {
    it ("returns true if `Math.random()` < 0.25", function() {
      spyOn(Math, 'random').and.returnValue(0.24);
      expect(weather.isStormy()).toBe(true);
    });

    it ("returns false if `Math.random()` >= 0.25", function() {
      spyOn(Math, 'random').and.returnValue(0.25);
      expect(weather.isStormy()).toBe(false);
    });
  });
});
