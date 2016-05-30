# Uniform setters

## Scalar float uniforms

### Shader declaration

```GLSL
uniform float x;
```

### active uniform info

```javascript
gl.getActiveUniform(prog, n) ->
{
	name: "x",
	type: gl.FLOAT,
	size: 1,
}
```

### webGL setters

```javascript
var x = gl.getUniformLocation(prog, "x")
gl.uniform1f(x, 10)
gl.uniform1f(x, [10])  // ???
gl.uniform1fv(x, [10])
```

### UFX.gl setters

```javascript
prog.setUniform.x(10)
prog.setUniformv.x([10])
prog.set.x(10)
```

## Scalar vector uniforms

### Shader declaration

```GLSL
uniform vec2 v;
```

### active uniform info

```javascript
gl.getActiveUniform(prog, n) ->
{
	name: "v",
	type: gl.FLOAT_VEC2,
	size: 1,
}
```

### webGL setters

```javascript
var v = gl.getUniformLocation(prog, "v")
gl.uniform2f(v, 0.5, 0.5)
gl.uniform2f(v, [0.5], [0.5])  // works?!
gl.uniform2fv(v, [0.5, 0.5])
```

### UFX.gl setters

```javascript
prog.setUniform.v(0.5, 0.5)
prog.setUniformv.v([0.5, 0.5])
prog.set.v([0.5, 0.5])
```

## Scalar matrix uniforms

### Shader declaration

```GLSL
uniform mat2 m;
```

### active uniform info

```javascript
gl.getActiveUniform(prog, n) ->
{
	name: "m",
	type: gl.FLOAT_MAT2,
	size: 1,
}
```

### webGL setters

```javascript
var m = gl.getUniformLocation(prog, "m")
gl.uniformMatrix2fv(m, false, [1, 2, 3, 4])
```

### UFX.gl setters

```javascript
prog.setUniformMatrix.m([1, 2, 3, 4])
prog.set.m([1, 2, 3, 4])
```

## Array float uniforms

### Shader declaration

```GLSL
uniform float a[3];
```

### active uniform info

```javascript
gl.getActiveUniform(prog, n) ->
{
	name: "a[0]",
	type: gl.FLOAT,
	size: 3,
}
```

### webGL setters

```javascript
var a0 = gl.getUniformLocation(prog, "a[0]")
var a1 = gl.getUniformLocation(prog, "a[1]")
var a2 = gl.getUniformLocation(prog, "a[2]")
var a = gl.getUniformLocation(prog, "a")
gl.uniform1f(a0, 10)
gl.uniform1f(a1, 20)
gl.uniform1f(a2, 30)
gl.uniform1fv(a, [10, 20, 30])
```

### UFX.gl setters

```javascript
prog.setUniform.a[0](10)
prog.setUniform.a[1](20)
prog.setUniform.a[2](30)
prog.setUniform["a[0]"](10)
prog.setUniform["a[1]"](20)
prog.setUniform["a[2]"](30)
prog.setUniformv.a([10, 20, 30])
prog.set.a[0](10)
prog.set.a[1](20)
prog.set.a[2](30)
prog.set["a[0]"](10)
prog.set["a[1]"](20)
prog.set["a[2]"](30)
prog.set.a([10, 20, 30])
```

## Array matrix uniforms

### Shader declaration

```GLSL
uniform mat2 c[3];
```

### active uniform info

```javascript
gl.getActiveUniform(prog, n) ->
{
	name: "c[0]",
	type: gl.FLOAT_MAT2,
	size: 3,
}
```

### webGL setters

```javascript
var c0 = gl.getUniformLocation(prog, "c[0]")
var c1 = gl.getUniformLocation(prog, "c[1]")
var c2 = gl.getUniformLocation(prog, "c[2]")
var c = gl.getUniformLocation(prog, "c")
gl.uniformMatrix2fv(c0, false, [10, 20, 30, 40])
gl.uniformMatrix2fv(c1, false, [50, 60, 70, 80])
gl.uniformMatrix2fv(c2, false, [90, 100, 110, 120])
gl.uniformMatrix2fv(c, false, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
```

### UFX.gl setters

```javascript
prog.setUniformMatrix.c[0]([10, 20, 30, 40])
prog.setUniformMatrix.c[1]([50, 60, 70, 80])
prog.setUniformMatrix.c[2]([90, 100, 110, 120])
prog.setUniformMatrix["c[0]"]([10, 20, 30, 40])
prog.setUniformMatrix["c[1]"]([50, 60, 70, 80])
prog.setUniformMatrix["c[2]"]([90, 100, 110, 120])
prog.setUniformMatrix.c([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
prog.set.c[0]([10, 20, 30, 40])
prog.set.c[1]([50, 60, 70, 80])
prog.set.c[2]([90, 100, 110, 120])
prog.set["c[0]"]([10, 20, 30, 40])
prog.set["c[1]"]([50, 60, 70, 80])
prog.set["c[2]"]([90, 100, 110, 120])
prog.set.c([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
```

## Nested struct uniforms

### Shader declaration

```GLSL
struct T {
	ivec2 g;
};
struct S {
	float f[2];
	T t;
};
uniform S s[3];
```

### active uniform info

```javascript
gl.getActiveUniform(prog, n) ->
{ name: "s[0].f[0]", type: gl.FLOAT, size: 2, }
{ name: "s[1].f[0]", type: gl.FLOAT, size: 2, }
{ name: "s[2].f[0]", type: gl.FLOAT, size: 2, }
{ name: "s[0].t.g", type: gl.INT_VEC2, size: 1, }
{ name: "s[1].t.g", type: gl.INT_VEC2, size: 1, }
{ name: "s[2].t.g", type: gl.INT_VEC2, size: 1, }
```

### webGL setters

Examples (not a complete list)

```javascript
var s0f = gl.getUniformLocation(prog, "s[0].f")
gl.uniform2fv(s0f, [10, 20])
var s0f1 = gl.getUniformLocation(prog, "s[0].f[1]")
gl.uniform1f(s0f1, 30)
var s1tg = gl.getUniformLocation(prog, "s[1].t.g")
gl.uniform1i(s1tg, 40)
```

### UFX.gl setters

Examples (not a complete list)

```javascript
prog.setUniformv.s[0].f([10, 20])
prog.setUniformv["s[0].f"]([10, 20])
prog.setUniformv["s[0]"].f([10, 20])
prog.setUniform.s[0].f[1](30)
prog.setUniform.s[0]["f[1]"](30)
prog.setUniform["s[0].f[1]"](30)
prog.set.s[0].f([10, 20])
prog.set.s[0].f[1](30)

prog.setUniform["s[1].t.g"](40)
prog.setUniformv["s[1].t.g"]([40])
prog.setUniform["s[1].t"].g(40)
prog.setUniform.s[1].t.g(40)
prog.set["s[1].t.g"](40)
prog.set.s[1].t.g(40)
```

