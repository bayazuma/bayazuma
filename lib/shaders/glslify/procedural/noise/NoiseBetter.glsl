//	<https://www.shadertoy.com/view/4dS3Wd>
//	By Morgan McGuire @morgan3d, http://graphicscodex.com
//

// For multiple octaves
#define NUM_NOISE_OCTAVES 5

float tkbys_hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
float tkbys_ValueNoise(vec2 x) {
	vec2 i = floor(x);
	vec2 f = fract(x);

	// Four corners in 2D of a tile
	float a = tkbys_hash(i);
	float b = tkbys_hash(i + vec2(1.0, 0.0));
	float c = tkbys_hash(i + vec2(0.0, 1.0));
	float d = tkbys_hash(i + vec2(1.0, 1.0));

	// Simple 2D lerp using smoothstep envelope between the values.
	// return vec3(mix(mix(a, b, smoothstep(0.0, 1.0, f.x)),
	//			mix(c, d, smoothstep(0.0, 1.0, f.x)),
	//			smoothstep(0.0, 1.0, f.y)));

	// Same code, with the clamps in smoothstep and common subexpressions
	// optimized away.
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// fBM: Fractal Brownian Motion
void tkbys_Noise_fBM(vec2 UV, float Scale, out float Out) {
	float v = 0.0;
	float a = 0.5;
	vec2 shift = vec2(100);
	// Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {
		v += a * tkbys_ValueNoise(UV * Scale);
		UV = rot * UV * 2.0 + shift;
		a *= 0.5;
	}
    Out = v;
}

#pragma glslify: export(tkbys_Noise_fBM)
