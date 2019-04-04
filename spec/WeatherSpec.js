describe("Weather", function() {
  var weather

  beforeEach(function() {
    weather = new Weather();
  });

  describe(".isStormy", function() {
    it ("it can be stormy", function() {
      spyOn(Math, 'random').and.returnValue(0.24);
      expect(weather.isStormy()).toBe(true);
    });

    it ("it can be not stormy", function() {
      spyOn(Math, 'random').and.returnValue(0.25);
      expect(weather.isStormy()).toBe(false);
    });
  });
});
