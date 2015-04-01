// 

var util = {
	// Create a canvas element with an associated webGL context and return the context.
	// optionally set the width and height of the canvas in pixels.
	getContext: function (width, height) {
		var canvas = document.createElement("canvas")
		document.body.appendChild(canvas)
		var gl = canvas.getContext("webgl")
		if (!gl) throw "webgl context could not be initialized"
		if (width) this.resize(gl, width, height)
		return gl
	},
	// Resize the canvas of the given gl context to the given width and height.
	resize: function (gl, width, height) {
		gl.canvas.width = width
		gl.canvas.height = height
		gl.viewport(0, 0, width, height)
	},
	// Clear the given gl context to the given color (specify r,g,b only).
	// optionally specify a box as a length-4 Array to specify the region to be cleared.
	clear: function (gl, color, box) {
		if (box) {
			gl.enable(gl.SCISSOR_TEST)
			gl.scissor(box[0], box[1], box[2], box[3])
		}
		gl.clearColor(color[0], color[1], color[2], 1)
		gl.clear(gl.COLOR_BUFFER_BIT)
		if (box) gl.disable(gl.SCISSOR_TEST)
	},
	// Build a GL program from the given gl context, using the given source for the vertex and
	// fragment shaders.
	buildProgram: function (gl, vsource, fsource) {
		var prog = gl.createProgram()
		var vshader = gl.createShader(gl.VERTEX_SHADER)
		gl.shaderSource(vshader, vsource)
		gl.compileShader(vshader)
		if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
			throw "Error compiling vertex shader:\n" + gl.getShaderInfoLog(vshader)
		}
		gl.attachShader(prog, vshader)
		var fshader = gl.createShader(gl.FRAGMENT_SHADER)
		gl.shaderSource(fshader, fsource)
		gl.compileShader(fshader)
		if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
			throw "Error compiling fragment shader:\n" + gl.getShaderInfoLog(fshader)
		}
		gl.attachShader(prog, fshader)
		gl.linkProgram(prog)
		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
			throw "Error linking program:\n" + gl.getProgramInfoLog(prog)
		}
		gl.validateProgram(prog)
		return prog
	},
}

