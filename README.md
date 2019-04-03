# Airport Challenge, JavaScript edition

*[Exercise instructions](exercise-instructions.md)*  
*[Original repo (Ruby edition)](https://github.com/makersacademy/airport_challenge)*

The Airport Challenge.... but in JavaScript!!!

## Goals

### I can learn anything by myself

My aim for this piece of work was to see if I could teach myself enough JavaScript and Jasmine to TDD a simple program, the Airport Challenge from week 1. I had done some JavaScript before so I was fairly familiar with its syntax, but I'd never done any OOP in it, and I'd never used a JavaScript testing framework, so that was all new.

## Process

The idea was to write a program in a language we had little to no experience in. The Airport Challenge tests your ability to use basic OOP principles like encapsulation and SRP, TDD, stubbing random behaviour, writing readable code etc.

I recorded my process of doing in this in **a lot** of detail in [this document](all-the-gory-details.md) (warning - extreme long-windedness!)

## Reflection

Here are some principles about teaching yourself a new programming language that I've derived from this experience. I guess this process may be different for different people, so YMMV.

### Know why you're doing it

For instance, in working on this project is the aim to become a super-duper JavaScript TDD wizard who knows the language and the test framework inside-out, or is it to reflect on the process of learning a new language?

The latter is my aim. So this will affect the amount of depth I go into learning JavaScript syntax and the intricacies of Jasmine. If I develop a good learning process then I will be able to pick those things up later anyway.

### Have a target

How will you know if you've achieved what you set out to achieve? Give yourself a target which is specific, measurable, attainable, realistic and time-bound.

My target was to TDD the Airport Challenge in JavaScript and Jasmine in a couple of mornings. I would know I was finished when I'd implemented the user stories... and... had decent test coverage?? how???

### Start writing code ASAP

I guess this is one where people may have different opinions, but for me the best way to learn is to start doing it. Write some code, if it doesn't work then work out why not, play around with it, try different things out. Explore the language and familiarise yourself with it. For me this is a much more direct way to come to an understanding than reading about it.

Of course you have to start somewhere, so some degree of research is usually necessary before you can even get an environment set up to work in. For this project that came from reading the Jasmine [getting started](https://jasmine.github.io/pages/getting_started.html) page. There are instructions there to download and install Jasmine. Once I had done that I had a template Jasmine project on my machine, including example spec and source files. So reading through the installation instructions and looking at the included files were enough to get me started.

### Leverage what you already know

The biggest help with this project was the knowledge I'd gained in the first four weeks at Makers, even though none of it applied directly to JavaScript.

The first thing I noticed looking at Jasmine was how similar the syntax is to RSpec, so much so that I immediately felt at home reading through the example specs. So when I was writing tests I already had a good idea how the syntax would work and what sort of matchers were likely to be available.

The way objects and inheritance works in JavaScript seems to be very different to how it's implemented in Ruby! But although the syntax is different the principle is the same. So once I'd googled to find how to implement OOP in JavaScript and learnt the different syntax I was comfortable applying principles I already knew such as SRP for classes and methods.

The same goes for TDD itself - different language/framework, same process. There were some new error messages to get to grips with in JavaScript, but the red, green, refactor cycle is the same.

There are also some bits of JavaScript syntax which are similar to Ruby, such as `array.push(element)`. I often found myself trying out bits of Ruby-like syntax in the console to see if I could use the same or similar in JavaScript.

### Reading the docs is sometimes good

I found the Jasmine docs very useful for this project. This is not always the case - sometimes documentation can be quite abstract and technical and hard to understand for a novice. But [this Jasmine introduction page](https://jasmine.github.io/2.3/introduction.html) looks like it contains examples and descriptions of every matcher that's available. Pretty much everything I needed to know about Jasmine, from testing for errors to using spies, I found out by searching for keywords on this page.

### Google is also good, but don't spend too long reading

I googled many, many things while working on this project. The single most helpful page I found was probably [this blogpost](https://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/) about applying OOP in JavaScript. This illustrates a potential problem though - the post is extremely long! I didn't want to spend too much time reading. My aim was to skim, find just what I need to get unstuck, and then get back to writing code.

The trick with googling is that you have to know what to ask for.
