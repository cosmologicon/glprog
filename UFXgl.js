"use strict"

var UFX = UFX || {}

UFX._gl = {
	getName: function (value) {
		for (var name in this) {
			if (name.toUpperCase() == name && this[name] == value) return name
		}
		return "UNKNOWN_ENUM:" + value
	},
	resize: function (w, h) {
		this.canvas.width = w
		this.canvas.height = h
		this.viewport(0, 0, w, h)
	},
	addProgram: function (progname, vsource, fsource) {
		if (!this.progs) this.progs = {}
		var prog = this.progs[progname] = this.buildProgram(vsource, fsource)
		return prog
	},
	// Build a program, using the given source for the vertex and fragment shaders.
	buildProgram: function (vsource, fsource) {
		var prog = this.createProgram()
		var vshader = this.createShader(this.VERTEX_SHADER)
		this.shaderSource(vshader, this.findSource(vsource))
		this.compileShader(vshader)
		if (!this.getShaderParameter(vshader, this.COMPILE_STATUS)) {
			throw "Error compiling vertex shader:\n" + this.getShaderInfoLog(vshader)
		}
		this.attachShader(prog, vshader)
		var fshader = this.createShader(this.FRAGMENT_SHADER)
		this.shaderSource(fshader, this.findSource(fsource))
		this.compileShader(fshader)
		if (!this.getShaderParameter(fshader, this.COMPILE_STATUS)) {
			throw "Error compiling fragment shader:\n" + this.getShaderInfoLog(fshader)
		}
		this.attachShader(prog, fshader)
		this.linkProgram(prog)
		if (!this.getProgramParameter(prog, this.LINK_STATUS)) {
			throw "Error linking program:\n" + this.getProgramInfoLog(prog)
		}
		this.validateProgram(prog)
		gl.deleteShader(vshader)
		gl.deleteShader(fshader)
		this.extendProgram(prog)
		return prog
	},
	findSource: function (scriptId) {
		if (scriptId.split) {
			var shaderScript = document.getElementById(scriptId)
			return shaderScript ? shaderScript.text : scriptId
		} else if (scriptId.text) {
			return scriptId.text
		}
		throw "Unable to find source from scriptId: " + scriptId
	},
	// Add convenience functions to the given program.
	extendProgram: function (prog) {
		var gl = this
		prog.use = function () {
			gl.useProgram(prog)
			gl.prog = prog
		}
		prog.use()
		prog.set = function (vars) {
			for (var name in vars) {
				this.set[name](vars[name])
			}
		}
		prog.uniforms = {}
		prog.setUniform = {}
		prog.setUniformv = {}
		prog.setUniformMatrix = {}
		var n = this.getProgramParameter(prog, this.ACTIVE_UNIFORMS)
		for (var i = 0 ; i < n ; ++i) {
			var info = this.getActiveUniform(prog, i)
			var location = this.getUniformLocation(prog, info.name)
			prog.uniforms[info.name] = location
			if (this.isMatrixType(info.type)) {
				var func = this.getUniformMatrixSetter(prog, location, info.type)
				prog.setUniformMatrix[info.name] = func
				prog.set[info.name] = func
			} else {
				var func = this.getUniformSetter(prog, location, info.type)
				var funcv = this.getUniformVectorSetter(prog, location, info.type)
				prog.setUniform[info.name] = func
				prog.setUniformv[info.name] = funcv
				prog.set[info.name] = this.getTypeSize(info.type) == 1 ? func : funcv
			}
		}
	},

	// Returns "f" or "i" for float or integer type.
	getTypeLetter: function (type) {
		switch (type) {
			case this.FLOAT: case this.FLOAT_VEC2: case this.FLOAT_VEC3: case this.FLOAT_VEC4:
			case this.FLOAT_MAT2: case this.FLOAT_MAT3: case this.FLOAT_MAT4:
				return "f"
			case this.INT: case this.INT_VEC2: case this.INT_VEC3: case this.INT_VEC4:
			case this.BOOL: case this.BOOL_VEC2: case this.BOOL_VEC3: case this.BOOL_VEC4:
			case this.SAMPLER_2D: case this.SAMPLER_CUBE:
				return "i"
		}
		throw "Unrecognized type " + type
	},
	// Returns 1, 2, 3, or 4.
	getTypeSize: function (type) {
		switch (type) {
			case this.FLOAT: case this.INT: case this.BOOL:
			case this.SAMPLER_2D: case this.SAMPLER_CUBE:
				return 1
			case this.FLOAT_VEC2: case this.INT_VEC2: case this.BOOL_VEC2: case this.FLOAT_MAT2:
				return 2
			case this.FLOAT_VEC3: case this.INT_VEC3: case this.BOOL_VEC3: case this.FLOAT_MAT3:
				return 3
			case this.FLOAT_VEC4: case this.INT_VEC4: case this.BOOL_VEC4: case this.FLOAT_MAT4:
				return 4
		}
		throw "Unable to get size for type " + type
	},
	isMatrixType: function (type) {
		switch (type) {
			case this.FLOAT_MAT2: case this.FLOAT_MAT3: case this.FLOAT_MAT4:
				return true
			default:
				return false
		}
	},

	getUniformSetter: function (prog, location, type) {
		if (this.isMatrixType(type)) {
			throw "Cannot call getUniformSetter on matrix type " + this.getName(type)
		}
		var methodname = "uniform" + this.getTypeSize(type) + this.getTypeLetter(type)
		return this[methodname].bind(this, location)
	},
	getUniformVectorSetter: function (prog, location, type) {
		if (this.isMatrixType(type)) {
			throw "Cannot call getUniformVectorSetter on matrix type " + this.getName(type)
		}
		var methodname = "uniform" + this.getTypeSize(type) + this.getTypeLetter(type) + "v"
		return this[methodname].bind(this, location)
	},
	getUniformMatrixSetter: function (prog, location, type) {
		if (!this.isMatrixType(type)) {
			throw "Cannot call getUniformSetter on non-matrix type " + this.getName(type)
		}
		var methodname = "uniformMatrix" + this.getTypeSize(type) + this.getTypeLetter(type)
		return this[methodname].bind(this, location, false)
	},
	makeFloatBuffer: function (data, mode) {
		var buffer = this.createBuffer()
		this.bindBuffer(this.ARRAY_BUFFER, buffer)
		this.bufferData(this.ARRAY_BUFFER, new Float32Array(data), (mode || this.STATIC_DRAW))
	},
}

UFX.gl = function (canvas, opts) {
	opts = opts || {}
	var gl = canvas.getContext("webgl")
	if (!gl) return gl
	gl.DEBUG = opts.DEBUG
	for (var method in UFX._gl) gl[method] = UFX._gl[method]
	return gl
}


