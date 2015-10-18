
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


