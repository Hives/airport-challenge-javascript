# Airport Challenge - JavaScript edition

*[Exercise instructions](exercise-instructions.md)*  
*[Original repo (Ruby edition)](https://github.com/makersacademy/airport_challenge)*

The Airport Challenge.... but in JavaScript!!!

## Process

The idea was to write a program in a language we had little to no experience in. The Airport Challenge tests your ability to use basic OOP principles like encapsulation and SRP, TDD, stubbing random behaviour, writing readable code etc.

### Getting up and running

[GitHub commit for this section](https://github.com/Hives/airport-challenge-javascript/commit/560b9b9a4d63771f517ad2062515b61b4aadfb6e)

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

[GitHub commit for this section](https://github.com/Hives/airport-challenge-javascript/commit/95e5691ebbf664b4634a0a42eab167866def129f)

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

### Using Jasmine mocks

[Relevant part of GitHub commit for this section](https://github.com/Hives/airport-challenge-javascript/commit/8abd83e52638eb2949369712200ae1239e5afc52#diff-4a1f251abc2397e671496199529d49d1)

For the next user story I want to check that the right plane leaves the airport when I tell it to take off, so my test will land a bunch of planes, tell one to take off, and check that only that one is no longer at the airport. Since I'll need a way to identify different planes and I'm going to need to mock them out eventually, now might be a good time to work out how mocks work in Jasmine.

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

Tests are passing, so that seems to be working.

### Second user story

[GitHub commit for this section](https://github.com/Hives/airport-challenge-javascript/commit/af7e02cd1974e91dd2c3a91673db9957136d0f0e#diff-4a1f251abc2397e671496199529d49d1)

> As an air traffic controller  
> So I can get passengers on the way to their destination  
> I want to instruct a plane to take off from an airport and confirm that it is no longer in the airport

Now let's try writing a test for the second user story:

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

**SPOILER ALERT - I later realise that this is wrong!**

### Raising errors to deal with edge cases

[GitHub commit for this section](https://github.com/Hives/airport-challenge-javascript/commit/b6bf6cf8d3f1345a005ec5e855d3da7eca90800f#diff-4a1f251abc2397e671496199529d49d1)

Let's add in a couple of edge cases now - we don't want to be able to land a plane that's already at the airport, and we don't want to an airport to tell a plane to take off if it's not at the airport. For these situations we're going to want to raise errors, and also test that errors were raised. In TDD style let's find out how to `expect` errors first. The Jasmine docs were helpful last time, so let's start there again. We find this in [the matchers section](https://jasmine.github.io/2.0/introduction#section-Included_Matchers):

```javascript
// in a describe block
var baz = function() {
    throw 'what';
};

expect(baz).toThrow('what');
```

That tells us how to throw an exception as well as how to test it. Let's use it in a test:

```javascript
it ("an airport cannot land a plane that's already landed", function() {
    var airport = new Airport();
    var plane = jasmine.createSpy('plane');
    airport.land(plane);
    expect(airport.land(plane)).toThrow("Could not land plane. Plane is already landed.");
});
```

This gives an unexpected error: `Error: <toThrow> : Actual is not a Function`. We were looking for something like `no error was thrown`. Looking at the example from the Jasmine docs above more closely I see that the function `baz` is passed into the `expect()` function, but not actually called. But in my test I am executing the `airport.land()` method rather than passing it. But I can't just pass the method into `expect()` as I need to include the `plane` argument... OK, let's have another look in Jasmine's docs and see what we can find. Searching the docs page for instances of 'toThrow' I find this:

```javascript
it("throws the value", function() {
    expect(function() {
        foo.setBar(123)
    }).toThrowError("quux");
});
```

This is in the section about spies, but maybe we can use the same syntax for our test? Let's rewrite our expectation like this:

```javascript
expect(function() {
    airport.land(plane);
}).toThrow("Could not lane plane. Plane is already landed.");
```

This seems familiar to us, as we remember that RSpec matchers that expect exceptions to be thrown require the code being tested to be wrapped in a block, so the `function` in this case is the equivalent to a Ruby block.

With this change we're getting an error that looks like what we want: `Expected function to throw an exception.` With a bit more googling (JavaScript's `if` syntax), we pass the test like this:

```javascript
Airport.prototype.land = function(plane) {
    if (this.planes.includes(plane)) {
        throw "Could not land plane. Plane is already landed.";
    };

    this.planes.push(plane);
}
```

That passes. We can also now easily write a test to check that `airport.takeOff` throws an error if the plane is not at the airport.

### Hold up, wait a minute

[GitHub commit for this section](https://github.com/Hives/airport-challenge-javascript/commit/d893382f7274e9d3a3b9696411e838938887407f#diff-4a1f251abc2397e671496199529d49d1)

Our test for a plane taking off was a bad test! As well as testing that `plane2` is no longer in `airport.planes`, we need to test that `plane1` and `plane3` still are. Let's update the test like this:

```javascript
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
```

And in fact, this is failing:

```
Expected NaN to contain spy on plane1.
Expected NaN to contain spy on plane3.
```

So after calling `airport.takeOff(plane2)` our `airport.planes` is returning `NaN`, JavaScript's 'not a number' keyword. Looks like our Ruby-like syntax of `this.planes -= [plane];` was too good be true after all.

So we google 'javascript remove from array by value', and the top result tells us:

> The best way to remove an element from an array based on the value in JavaScript is to find index number of that value in an array using indexOf() function and then delete particular index value using the splice() function. For example use following code...

Now I'm starting to miss Ruby's magic :( but let's do what they suggest:

```javascript
Airport.prototype.takeOff = function(plane) {
    if (!this.planes.includes(plane)) {
        throw "Plane could not take off. Plane is not at airport.";
    };

    var index = this.planes.indexOf(plane);
    this.planes.splice(index, 1);
}
```

That wasn't so bad. Tests are now passing again.

### Refactoring

[GitHub commit for this section](https://github.com/Hives/airport-challenge-javascript/commit/124dc92624ab1e01484abf45c8bc961d765bdbb0#diff-4a1f251abc2397e671496199529d49d1)

Our code is ripe for a refactor now. Our tests in particular are not very DRY, so let's move all the object initialisations into a `beforeEach` function.

From googling to find out more about implementing OOP in JavaScript I found [this page (OOP In JavaScript: What You NEED to Know)](https://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/) which suggests it's slightly neater to add methods to the prototype in one go by doing:

```javascript
Airport.prototype = {
    method1: function() { /* .. */ },
    method2: function() { /* .. */ }
};
// rather than a bunch of these:
Aiport.prototype.method1 = function() { /* .. */ };
Aiport.prototype.method2 = function() { /* .. */ };
```

Only thing you have to watch out for is re-including the constructor, as this method overrides it. So let's rewrite out `Airport.js` like that.

Let's also break up our tests by adding in separate `describe` functions for the methods we're testing.

### Stubbing out random behaviour in tests - user stories 3 and 4

[GitHub commit for this section (I reindented everything at this point so it's hard to see what changed...)](https://github.com/Hives/airport-challenge-javascript/commit/3677aee2fa6e0943278799edf48b4137d263541c#diff-4a1f251abc2397e671496199529d49d1)

> As an air traffic controller  
> To ensure safety  
> I want to prevent takeoff when weather is stormy

We want the weather behaviour to be random. From doing this project in Ruby I know that to reliably test for this we're going to have to stub out the random behaviour. Here's [a StackOverflow answer](https://stackoverflow.com/a/15753204/1107844) that suggests mocking the behaviour of `Math.random`, so we'll try that.

To write this test we also need to have an idea how `Math.random` works. [According to MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random):

> The Math.random() function returns a floating-point, pseudo-random number in the range 0–1 (inclusive of 0, but not 1) with approximately uniform distribution over that range — which you can then scale to your desired range.

So let's say that in our program we'll pick a random number between 0 and 1, and the weather will be stormy if the number is < 0.25.

Now we know enough to write a test. Something like this:

```javascript
it ("when the weather is bad planes can't land", function() {
    spyOn(Math, 'random').and.returnValue(0.24);
    expect(function() {
        airport.land(plane1);
    }).toThrow("Could not land plane. Weather was stormy.");
});
```

Update our `Airport.land` method like this to pass this test:

```javascript
// inside Aiport.prototype
land: function(plane) {
    if (Math.random() < 0.25) {
        throw "Could not land plane. Weather was stormy.";
    };
    if (this.planes.includes(plane)) {
        throw "Could not land plane. Plane is already landed.";
    };
    this.planes.push(plane);
}
```

But now of course all the other tests are randomly passing or failing, so we need to stub the weather to be good in all of them too. No new knowledge required for that

Once we've done that it should be easy to implement the fourth user story, which is very similar:

> As an air traffic controller  
> To ensure safety  
> I want to prevent landing when weather is stormy

We write this test:

```javascript
describe("when the weather is bad", function () {
  it ("planes can't take off", function() {
    spyOn(Math, 'random').and.returnValue(0.25);
    airport.land(plane1)
    spyOn(Math, 'random').and.returnValue(0.24);
    expect(function() {
      airport.takeOff(plane1);
    }).toThrow("Plane could not take off. Weather was stormy.");
  });
```

But we get a surprising new error:

```
Error: <spyOn> : random has already been spied upon Usage: spyOn(<object>, <methodName>) in file:///Users/student/Documents/week-5/airport-challenge-javascript/lib/jasmine-3.3.0/jasmine.js (line 6178)
```

What does that mean - you can't change the behaviour of a spy after you've set it?? Googling the error message turns up a [StackOverflow answer](https://stackoverflow.com/a/28821717/1107844):

> You can just overwrite it
> `updateService.getUpdate = jasmine.createSpy().and.returnValue(etc)`

So in our program that will look like:

```javascript
Math.random = jasmine.createSpy().and.returnValue(0.24)
```

Now we're getting the error we expect: `Expected function to throw an exception.` So we can pass the test and implement the user Story in the same way as the last one.

### Dependency injection - creating a weather object

But we don't want to leave the weather situation like this. Deciding whether the weather is good or bad shouldn't be the responsibility of our airport object. We should extract a weather object to do that. But we also want the tests for our airport and weather objects to be independent, so to achieve that we'll need to pass the weather object in as a dependency, and stub out it's behaviour in the tests for airport.

Let's start by TDDing a weather object, then inject it into our airport object via the constructor, then update our tests to mock its behaviour.

In Ruby we would do something like `weather.stormy?` and expect it to return a boolean

Let's start by TDDing a weather object, then inject it into our airport object via the constructor, then update our tests to mock its behaviour.

In Ruby we would do something like `weather.stormy?` and expect it to return a boolean. I know this is called a predicate method in Ruby, so I google 'predicate method javascript' and quickly find that they're called predicate methods in JavaScript too, and the convention Script is to write them as e.g. `weather.isStormy()`.

We will also need to test whether the method is returning true or false, and the Jasmine docs tell us we can do that with `expect(true).toBe(true)`. So knowing that we can write our tests. I cheated and wrote two at the same time:

```javascript
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
```

So we add this into `SpecRunner.html` and follow the errors though to produce this definition for weather:

```javascript
function Weather() {};

Weather.prototype = {
  constructor: Weather,
  isStormy: function() {
    return Math.random() < 0.25;
  }
};
```

All tests passing. ([GitHub commit for this.](https://github.com/Hives/airport-challenge-javascript/commit/43e57004bb4da9b46a353e3c228600a2e118a29a#diff-54656ca4d5078be80cb746321c597634))


