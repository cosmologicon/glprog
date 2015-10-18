# glprog lessons

OpenGL is a popular and powerful graphics API, available in many different versions and languages.
WebGL is a relatively new OpenGL version that runs in your browser using JavaScript.

OpenGL has been around for a long time, and undergone many changes. WebGL is based on a modern,
stripped-down version called OpenGL ES. While this is great because it means WebGL can run even on
less powerful hardware, like mobile phones, it means that many of the OpenGL resources out there
don't work with WebGL, which can make learning it frustrating.

So these lessons are for people who don't know the basics of OpenGL, but want to learn them for
WebGL specifically.

## Lesson listing

* Lesson 01. the WebGL context
* Lesson 02. WebGL programs
* Lesson 03. drawing single points
* Lesson 04. depth and blending
* Lesson 05. GLSL part 1: types and precision
* Lesson 06. GLSL part 2: functions
* Lesson 07. GLSL part 3: shading
* Lesson 08. textures part 1: loading data
* Lesson 09. textures part 2: texture settings

More lessons coming soon!

## About these lessons

These are lessons for learning the fundamentals of WebGL for people who know JavaScript and enough
math, and who don't know OpenGL. If this is not what you're looking for, there may be something
better for you.

* These lessons assume you don't know OpenGL. If you already know OpenGL, you can probably learn
WebGL faster from a general WebGL tutorial.
* Similarly, if you plan to learn other kinds of OpenGL besides WebGL some day, it might be easier
to learn OpenGL first. There are many resources for learning OpenGL. Try to find a modern one, as
older ones (such as NeHe) used very different techniques.
* These lessons assume you want to get down to the fundamentals. If you're okay with using a
high-level library to abstract away the details of WebGL, there are good options you should use
instead, such as [Three.js](http://threejs.org/). Unity will also export to WebGL without you
needing to write it yourself.
* If you're from the future, there's probably something better. These lessons cover WebGL 1.0, which
is widely supported as of October 2015, and which nothing has replaced. If you're from 2017 or
later, I expect WebGL 2.0 or something else to be widely supported, so you should go learn that.
* You need to know JavaScript for these lessons. If you're not that familiar with JavaScript, go
learn that first. I recommend [MDN](https://developer.mozilla.org/en-US/Learn/JavaScript) and I've
heard good things about [CodeAcademy](https://www.codecademy.com/tracks/javascript).
* You need some familiarity with the basics of 2D drawing with the HTML5 canvas element. If you
don't have any experience with that, I recommend [diveintohtml5's canvas
chapter](http://diveintohtml5.info/canvas.html).
* You need what in the USA would be a high school level understanding of Algebra 2 and Trigonometry.
This is essential for low-level 3D graphics. If you don't know how matrix multiplication works, or
you don't know the parametric equation for the unit circle, I recommend getting a textbook or taking
an online course. I've heard good things about Khan Academy.

Also, I don't use semicolons in my JavaScript, and I'm not going to add them just to make you feel
better. Sorry. If that's a dealbreaker for you, I understand.

After I started these lessons, I found [WebGL Fundamentals](http://webglfundamentals.org), which is
also great and I recommend it. Those lessons introduce the concepts in a different order and with
different levels of detail than what I'm doing, so you can probably use them both.

## How to use the lessons

The "lessons" are commented, working example code, with accompanying READMEs. I tested them in
Chrome, so I can't guarantee they'll work in other browsers, but I took care to make the WebGL parts
portable. The first lesson is `01.html` and the corresponding README is `01.md`.

You should download the lessons from the repository so that you have a local copy that you can edit.
To start a lesson, open the html file in your browser and see that what's displayed matches the text
at the top. Open the html file in your text editor of choice, so that you can make changes to it and
refresh the browser to see them in action.

Also open the developer console in your browser (or whatever you use when developing JavaScript), so
you can see any errors, and see anything that's output to the console. `console.log` lines are used
throughout the lesson, to demonstrate the simple getter functions. Make sure the console matches
what the lesson says it should say.

Also open the README for that lesson. Neither the README nor the html file by itself is enough: you
need to go back and forth between them, seeing where the concepts from the README are used in the
html file. You should aim to understand all the lines in the html.

Finally, there are some exercises at the end of the README. Doing these is probably the best thing
you can do to make sure you understand the material. To do the exercises, edit the html file in your
text editor, and reload the page in your browser to check that you did the exercise right. You can
skip exercises, and do the exercises in any order. They assume you're starting from the original
html file. You may need to undo your changes from exercise 1 before you can do exercise 2.

I'm not relying on any helper libraries, although these are very common with WebGL. I want to make
sure you see exactly what the calls look like at the basic level, without "locking you in" to using
my helper library. Having said that, I have some helpful functions in `util.js` if you want to use
them.

Finally, if you have any questions at all, please email me.

## To be covered in future lessons

* Texture cube maps
* Framebuffer objects
* Shader attributes, drawing multiple points
* Drawing lines
* Shader varyings
* Drawing triangles
* Element array buffers

## References

https://www.khronos.org/files/opengles_shading_language.pdf
