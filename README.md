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

OK, we're up and running! Now let's look at the first user story:

> As an air traffic controller
> So I can get passengers to a destination
> I want to instruct a plane to land at an airport

So let's add this to our tests:

```javascript
it("an airport can land a plane", function() {
    var airport = new Airport();
    var plane = "a plane";
    airport.land(plane);
    expect(airport.planes).toContain(plane);
});
```

We don't know anything about `plane` at this point. I'll probably want to use a double for it (in RSpec lingo) at some point, but for now I'll just use a string.

Test is failing:

```javascript
TypeError: airport.land is not a function in file:///Users/student/Documents/week-5/airport-challenge-javascript/spec/AirportSpec.js (line 10)
```

This is familiar from RSpec - we don't have a `.land` method on our `airport` object. Let's TDD this and see how the Jasmine errors lead us on. In the FizzBuzz example we added methods to objects using the `prototype` keyword like this:

```javascript
Airport.prototype.land = function() {
}
```

That seemed to work, as we're now getting a different error:

```javascript
Expected [  ] to contain 'a plane'.
```

This is not exactly what we would expect from our Ruby experience though - if we did the equivalent steps with RSpec, we'd be getting an error like `plane.land() expected to receive 0 arguments but received 1`. So it looks like JavaScript is less fussy about what arguments a method receives than Ruby. This is a shame from the TDD perspective - the more errors you get, the more closely the tests can drive your code.

Let's update our code like this:

```javascript
Airport.prototype.land = function(plane) {
    this.planes.push(plane)
}
```

That passes the test. At this point I notice that if you rerun the Jasmine test page then the order of the tests changes. Clicking on the 'Options' button in the corner I see it's an option you can turn on or off. This is new compared to RSpec, but seems like a good idea - your tests should be independent, so they should pass whatever order you run them in.


