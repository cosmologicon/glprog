Lessons are as follows:



In 2D graphics, in order to draw a scene, you sort your objects by z-index and just draw them on top
of each other. In 3D graphics, this is, in general, much harder, because you need to deal with
complex shapes in many different orientations.

It would be nice if there was a way for fragments that come out of the fragment shader to be sorted
before being applied to the framebuffer. But for whatever reason, this is not possible. The
fragments are applied in the order they're called. So you must rely on another tool: depth testing.

In a framebuffer (like the viewport), there are three kinds of buffers: the color buffer, the depth
buffer, and the stencil buffer. (The stencil buffer is useful for a few effects like portals and
shadows, but it's kind of advanced, so I won't be covering it.) The color buffer is easy to
understand. It's the colors you actually see in the viewport. You don't directly view the contents
of the depth buffer directly, but it's there too.

So what does the depth buffer contain, and how does it help? It contains a value from 0 to 1 for
each fragment (pixel) that represents the distance from the viewer of the surface covering that
fragment. 0 is nearest and 1 is farthest. When a new surface is being written to that fragment,
webGL performs depth testing, and only updates the fragment if the new depth is less than the old
depth (ie, the new object is closer to the viewer than the existing object).

How is a fragment's depth determined? It's from the z-component of gl_Position. Objects will appear
if gl_Position.z is between -1 and 1, and this value will be mapped to the range [0, 1] for the
depth buffer.


Here's my short advice:

If you don't have any alpha transparency in your scene whatsoever, enable depth testing (with the
default depth function of LESS) and leave blending disabled. That's all you need.

If you do need to worry about alpha transparency, use the separated blending function:

	gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, 0, 1)
	gl.enable(gl.BLEND)

Separate your surfaces into solid and transparent ones, and draw all the solid ones first. If
possible, sort your transparent surfaces from far to near and draw them in that order.

While drawing the transparent surfaces, you can optionally disabled the depth mask:

	gl.depthMask(false)

Whether this produces better results depends on how transparent your transparent surfaces are, and
how they cover each other. I recommend trying it both ways.

