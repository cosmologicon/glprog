var util = {
	getContext: function (width, height) {
		var canvas = document.createElement("canvas")
		document.body.appendChild(canvas)
		var gl = canvas.getContext("webgl")
		if (!gl) throw "webgl context could not be initialized"
		if (width !== undefined) this.resize(gl, width, height)
		return gl
	},
	resize: function (gl, width, height) {
		gl.canvas.width = width
		gl.canvas.height = height
		gl.viewport(0, 0, width, height)
	},
	clear: function (gl, color, box) {
		if (box !== undefined) {
			gl.enable(gl.SCISSOR_TEST)
			gl.scissor(box[0], box[1], box[2], box[3])
		}
		gl.clearColor(color[0], color[1], color[2], 1)
		gl.clear(gl.COLOR_BUFFER_BIT)
		if (box !== undefined) gl.disable(gl.SCISSOR_TEST)
	},
}

