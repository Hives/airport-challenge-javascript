# Airport Challenge - JavaScript edition

*[Exercise instructions](exercise-instructions.md)*  
*[Original repo (Ruby edition)](https://github.com/makersacademy/airport_challenge)*

The Airport Challenge.... but in JavaScript!!!

## Process

The idea was to write a program in a language we had little to no experience in. The Airport Challenge tests your ability to use basic OOP principles like encapsulation and SRP, TDD, stubbing random behaviour, writing readable code etc.

At the point of starting the project I had got as far as TDDing FizzBuzz using JavaScript with the [Jasmine](https://jasmine.github.io/) framework. So the first thing I did was download Jasmine and unzip it to create my program and testing framework.

Since I'd implemented the same project in Ruby a few weeks ago I was decided not to plan too much and dive straight in with my first test. Since we're learning, let's start with something simple that isn't strictly required by the user stories: asserting that a new `airport` object should be empty.

Having already done some basic testing in Jasmine, and due to the syntax's similarity to RSpec, with which I was already familiar, I knew I had to update my `SpecHelper.html` to run my tests, and then I wrote this test in `spec/AirportSpec.js`:

```javascript
describe("Airport", function() {
    it("a new airport should contain no planes", function() {
        var airport = new Airport();
        expect(airport.planes).toEqual([]);
    });
});
```

And I passed it with this code, in `src/Airport.js`:

```javascript
var Airport = function Airport() {
    this.planes = [];
}
```

OK, we're up and running!
