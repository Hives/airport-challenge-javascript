# Airport Challenge, JavaScript edition

*[Exercise instructions](exercise-instructions.md)*  
*[Original repo (Ruby edition)](https://github.com/makersacademy/airport_challenge)*

The Airport Challenge.... but in JavaScript!!!

## Goals

### I can learn anything by myself

My aim for this piece of work was to TDD a simple program using JavaScript and Jasmine so that I could reflect on my process of learning to use a new language and test framework. I had done some JavaScript before so I knew some of its syntax, but I'd never done any OOP in it, and I'd never used a JavaScript testing framework, so that was all new.

## Process

The idea was to write a program in a language I had little to no experience in. The Airport Challenge tests your ability to use OOP principles like SRP, TDD, stubbing out random behaviour, writing readable code etc.

I recorded my process of doing in this in **a lot** of detail in [this document](all-the-gory-details.md). I wanted to be really aware as I was working on this of everything I was doing to get unstuck, whether it was googling, reading the docs, trying random stuff out in the console, interrogating my test error messages, or anything else. I think this degree of self-consciousness caused me to concentrate less on some other aspects of my coding, but it's given me a lot of material to use to reflect on my learning process.

## Reflection

Here are some principles about teaching yourself a new programming language that I've derived from this experience. I guess this process may be different for different people, so YMMV.

### Have a specific target

My target was to TDD the Airport Challenge in JavaScript and Jasmine in a morning. It ended up taking two, because I wrote such copious notes. Since my goal was more to reflect on my process than to necessarily become a wizard of TDDing in JavaScript I considered that for the purposes of this exercise I'd met the target when I'd implemented the main user stories, but not all the edge cases.

### Start writing code ASAP

I guess this is one where people may have different opinions, but for me the best way to learn is to start doing it. Write some code, make mistakes, if something doesn't work then work out why not, play around with it, try different things out. Explore the language and familiarise yourself with it. For me this is a much more direct way to come to an understanding than reading about it. As Ed said in our kick-off this week, "make mistakes quickly" so that you can keep learning from them. Or words to that effect.

Of course you have to start somewhere, so some degree of research is usually necessary before you can even get an environment set up to work in. For this project that came from reading the Jasmine [getting started](https://jasmine.github.io/pages/getting_started.html) page. There are instructions there to download and install Jasmine. Once I had done that I had a template Jasmine project on my machine, including example spec and source files. So reading through the installation instructions and looking at the included files were enough to get me started.

### Leverage what you already know

The biggest help was the knowledge I'd gained in the first four weeks at Makers, even though none of it applied directly to JavaScript.

For instance a good debugging process can easily be transferred from one language to another, and is even more important when learning a new language as your code is likely to have a lot more problems at first. The same goes for test driving - being able to interpret the errors from your failing tests becomes even more valuable in an unfamiliar language, as it will give you vital pointers on what code you need to write, or at least what to google to find out.

Abstract concepts like classes and methods, SRP and encapsulation are still applicable, even though the syntax is difference.

A big surprise though was how helpful my concrete knowledge of RSpec syntax was to writing Jasmine tests. Even in a different language, the syntax was so similar that I instantly felt at home, and I had a good idea of what sort of matchers were likely to be available. I also managed to discover bits of JavaScript syntax by making Ruby-inspired guesses in the console, such as `array.push(element)` and `array.length`.

### Reading the docs is sometimes good

I found the Jasmine docs very useful for this project. This is not always the case - sometimes documentation can be quite abstract and technical and hard to understand for a novice. But [this Jasmine introduction page](https://jasmine.github.io/2.3/introduction.html) contains examples and descriptions of every matcher that's available. Pretty much everything I needed to know about Jasmine, from testing for errors to using spies, I found out by searching for keywords on this page.

### Google is also good, but don't spend too long reading

I googled many, many things. The single most helpful page I found was probably [this blogpost](https://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/) about applying OOP in JavaScript. This illustrates a potential problem though - the post is extremely long! I started getting sucked into reading the whole thing, before realising that I only needed a very small part of it to get unstuck. Once I realised this I went back to my code, tried out a few variations of constructor and prototype syntax until I was comfortable that I understood it well enough for what I needed, and then I continued.

### Copy and pasting is not a good way to learn

A corollary to the previous section. Copy and pasting code from StackOverflow without understanding it not a good way to learn, and may come back and bite you if the code doesn't do quite what you thought. This is a greater risk in an unfamiliar language. Where I found bits of code through googling I tried to investigate and understand exactly what they were doing before using them.

### Test errors are your friends

I mentioned this before, but I think it deserves it's own subheading. My TDD test error messages took on a new dimension of helpfulness when working in a language I wasn't so familiar with. Googling the error messages often revealed bits of syntax I had misunderstood or guessed badly, quickly expanding my knowledge. I think the fact that I found myself quite comfortable with Jasmine helped here.

