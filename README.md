# Airport Challenge - JavaScript edition

*[Exercise instructions](exercise-instructions.md)*  
*[Original repo (Ruby edition)](https://github.com/makersacademy/airport_challenge)*

The Airport Challenge.... but in JavaScript!!!

## Process

The idea was to write a program in a language we had little to no experience in. The Airport Challenge tests your ability to use basic OOP principles like encapsulation and SRP, TDD, stubbing random behaviour, writing readable code etc.

### Getting up and running

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

### First user story - landing planes

Now let's look at the first user story:

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

### Second user story - using Jasmine mocks

> As an air traffic controller 
> So I can get passengers on the way to their destination 
> I want to instruct a plane to take off from an airport and confirm that it is no longer in the airport

For this user story I want to check that the right plane leaves the airport when I tell it to take off, so my test will land a bunch of planes, tell one to take off, and check that only that one is no longer at the airport. Since I'll need a way to identify different planes and I'm going to need to mock them out eventually, now might be a good time to work out how mocks work in Jasmine.

So I googled 'jasmine mocks', and this was the second result: [How to write better Jasmine tests with mocks](https://eclipsesource.com/blogs/2014/03/27/mocks-in-jasmine-tests/). From this I learned that Jasmine has things called 'spies' which seem to be what I'm looking for. The rest of that article seemed too complicated for what I wanted, so let's ignore the rest of it and look in Jasmine's docs for 'spies' instead. And we find [this](https://jasmine.github.io/2.0/introduction#section-Spies:_%3Ccode%3EcreateSpy%3C/code%3E):

```javascript
beforeEach(function() {
    whatAmI = jasmine.createSpy('whatAmI');

    whatAmI("I", "am", "a", "spy");
});
```

So we can create a 'bare' spy object that has no implementation using Jasmine's `createSpy` method. That's all we need for now.

We note also the use of `beforeEach`, which we recognise from RSpec. That'll come in handy for refactoring our tests later.

Let's refactor our last test to use a spy plane instead of that string we used:

```javascript
it("an airport can land a plane", function() {
    var airport = new Airport();
    var plane = jasmine.createSpy('plane');
    airport.land(plane)
    expect(airport.planes).toContain(plane);
});
```

Tests are passing, so that seems to be working. Now let's try writing a test for the second user story:

```
it("an airport can tell a plane to take off", function() {
    var airport = new Airport();
    var plane1 = jasmine.createSpy('plane1');
    var plane2 = jasmine.createSpy('plane2');
    var plane3 = jasmine.createSpy('plane3');
    airport.land(plane1);
    airport.land(plane2);
    airport.land(plane3);
    airport.takeOff(plane2);
    expect(airport.planes).not.toContain(plane2);
});
```

Following the error messages I define an `airport.takeOff()` method in my airport definition, and I end up with this error message:

```javascript
Expected [ spy on plane1, spy on plane2, spy on plane3 ] not to contain spy on plane2.
```

In my ruby program I implemented this by doing something like `planes -= [plane]`. I wonder if the same syntax works in JavaScript? Let's try adding this to my airport definition:

```javascript
Airport.prototype.takeOff = function(plane) {
    this.planes -= [plane];
}
```

And that passes!


