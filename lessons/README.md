# glprog lessons

These are lessons for learning the fundamentals of WebGL for people who know JavaScript and don't
know OpenGL. If this is not what you're looking for, there may be something better for you.

* These lessons assume you don't know OpenGL. If you already know OpenGL, you can probably learn
WebGL faster from a general WebGL tutorial.
* Similarly, if you plan to learn other kinds of OpenGL besides WebGL some day, it might be easier
to learn OpenGL first. There are many resources for learning OpenGL. Try to find a modern one, as
older ones (such as NeHe) used very different techniques.
* These lessons assume you want to get down to the fundamentals. If you're okay with using a
high-level library to abstract away the details of WebGL, there are good options you should use
instead, such as [Three.js](http://threejs.org/).
* If you're from the future, there's probably something better. These lessons cover WebGL 1.0, which
is widely supported as of May 2015, and which nothing has replaced. If you're from 2017 or later, I
expect WebGL 2.0 or something else to be widely supported, so you should go learn that.
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

Background
==========

OpenGL has several different versions with significantly different features. OpenGL ES is a
stripped-down version of OpenGL that supports the newer features but not many of the older ones.
It's designed to run even on less powerful hardware, like mobile devices. WebGL is based on OpenGL
ES. The WebGL API is almost identical to the OpenGL ES API. The only main differences have to do
with how JavaScript treats numerical types.

The features that OpenGL ES removed from previous versions of OpenGL were commonly used, especially
by beginners. That means that if you find a tutorial written for (non-ES) OpenGL, there's a very
good chance it won't work in WebGL. I've also found that most of the tutorials for OpenGL ES or
WebGL assume you already know the basics of OpenGL.

So these lessons are supposed to fill the gap, for people who don't know the basics, but want to
learn them for WebGL.

How to use the lessons
======================

The "lessons" are commented, working example code, with accompanying READMEs. The examples may only
work in Chrome, but not because of the WebGL parts. Those should all be portable. The first lesson
is `01.html` and the corresponding README is `01.md`.

You should download the lessons from the repository so that you have a local copy that you can edit.
To start a lesson, open the html file in your browser and see that what's displayed matches the text
at the top. Open the html file in your text editor of choice, so that you can make changes to it and
refresh the browser to see them in action. Also open the README for that lesson. I recommend going
back and forth between the README and the html file, seeing where the concepts from the README are
used in the html file. You should aim to understand all the lines in the html.

You should also open the developer console in your browser, so you can see any errors, and see
anything that's output to the console. `console.log` lines are used throughout the lesson, to
demonstrate the simple getter functions. Make sure the console matches what the lesson says it
should say.

Finally, there are some exercises at the end of the README. Doing these is probably the best thing
you can do to make sure you understand the material. To do the exercises, edit the html file in your
text editor, and reload the page in your browser to check that you did the exercise right.

I'm not relying on any helper libraries, although these are very common with WebGL. I'm writing out
everything at least once. If something is going to come up a lot, I'll put a method in `util.js`,
but only after I've shown it in the lesson. `01a.html` is the same as `01.html` with some of the
code moved into `util.js`, and most of the detailed comments removed.

Lesson listing
--------------

1. Creating the WebGL context, `clear`, `viewport`, `scissor`
2. Shaders, WebGL programs
3. Shader uniforms, drawing single points
4. Depth testing, blending
5. Shader functions, matrices, other GLSL stuff
6. Texture objects, mipmaps, texture wrapping options
7. Texture cube maps
8. Framebuffer objects
9. Shader attributes, drawing multiple points
10. Drawing lines

To be covered in future lessons
-------------------------------

* Shader varyings
* Drawing triangles
* Element array buffers

Helpful concepts
================

Here are a few concepts I've found helpful when learning how WebGL works.

The context object
------------------

The entire API is methods and constants on the WebGL context object, which you should call `gl`.
The API is not object-oriented, even though you do produce objects. The objects that get produced
don't have any useful methods. Instead, you need to pass them as argument back to `gl`. For
instance, you can create a shader object:

	var shader = gl.createShader(gl.VERTEX_SHADER)

but instead of compiling it like this:

	shader.compiler()

you do it like this:

	gl.compileShader(shader)

There are a bunch of numerical constants that are used as flags for many of the methods, like
`gl.VERTEX_SHADER` above. These are written with all caps. You never use their value for anything,
you just pass them as arguments to `gl` methods.

In other OpenGL API implementations besides WebGL, the methods and constants are named more or less
the same thing, but instead of a context object, they have prefixes. So they look like
`glCreateShader` and `GL_VERTEX_SHADER`. That might help find information about the API online, but
keep in mind there might be subtle differences from the WebGL version.

Client and server
-----------------

You can think of everything that runs on the JavaScript side as being a "client", and everything
that happens behind the WebGL API as being a "server". It's generally (but not 100%) true that
the client runs on the CPU, and the server runs on the GPU. I'll usually refer to the client as
"JavaScript", and the server as "WebGL" - it should be clear from context what I actually mean.

When it comes to efficiency, both the client and the server take time to run, but where you really
want to look for bottlenecks is in client/server communications, i.e., WebGL API calls. If there's
a call that you're making every frame of your game, when you could just be making it just once,
it's probably worth changing it.

On the other hand, if you're not used to working with the GPU, you should probably avoid making
optimizations right away. It can be pretty counterintuitive what works and what doesn't, so I
suggest getting some experience first.

WebGL as a state machine
------------------------

There are very few methods that actually tell WebGL to draw anything, and looking at the draw call
itself doesn't really tell you what's being drawn. That all depends on the large amount of state
that WebGL has at any time, and there are a bunch of methods to set the state.

There are several getter and setter methods. They don't really appear in pairs, though, and often a
single getter corresponds to several setters, and you specify what you want to get or set with one
of those constants. The getters always start with "get", and the setters don't have a prefix. This
is probably because you're usually setting a lot more frequently than getting.

	gl.clearColor(0, 0, 0, 1)  // set the clear color
	var c = gl.getParameter(gl.COLOR_CLEAR_VALUE)  // get the clear color

Because of efficiency concerns, many people will keep a client-side copy of the relevent parts of
the WebGL state at any time, to avoid having to call the getters. But again, I wouldn't worry about
that yet.

Shaders
-------

I'm just saying this because it confused me for a long time: shaders do not, in general, have to do
with shading.

Shaders are programs that run when you call a draw method, in order to determine where the drawn
objects appear and what color they are. Shading is part of that, of course, but just one part. I
think the name is a bit of misnomer. To create shaders, you need to pass their source code as a
string to WebGL.

Shaders are written in GLSL ES (the OpenGL ES Shading Language), not JavaScript. GLSL is kind of a
cool language. It's really limited and it takes some getting used to, but it has a nifty syntax
for doing what it does.


References
----------

https://www.khronos.org/files/opengles_shading_language.pdf
