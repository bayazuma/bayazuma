#pragma glslify: tkbys_TilingAndOffset_vec2 = require("./glslify/uv/TilingAndOffset.glsl")
#pragma glslify: tkbys_Sine_float = require("./glslify/math/trigonometry/Sine.glsl")
#pragma glslify: tkbys_Multiply_float = require("./glslify/math/basic/Multiply.glsl")
#pragma glslify: tkbys_Step_float = require("./glslify/math/round/Step.glsl")
#pragma glslify: tkbys_Noise_fBM = require("./glslify/procedural/noise/NoiseBetter.glsl")

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_progress;

varying vec2 vUv;

void main(void) {
  // base
  vec2 window_uv = (gl_FragCoord.xy) / u_resolution.xy; // 単純正規化
  vec2 tex_uv = vUv;

  // ノイズ
  float noise;
  tkbys_Noise_fBM(tex_uv, 0.4, noise);

  // 変数
  float speed = 5.2;
  float moveX = sin(u_time) * speed;
  float baseY = max(-1.0 * u_progress * 5.0, -3.0);
  float frequency = 3.0 * 6.2;
  float amplitude = sin(u_time * noise * 5.0) * 0.3;

  // uv
  vec2 uv;
  tkbys_TilingAndOffset_vec2(tex_uv, vec2(frequency, frequency), vec2(moveX, baseY), uv);
  float uvx = uv[0];
  float uvy = uv[1];

  // shape
  float shape;
  tkbys_Sine_float(uvx, shape);
  // tkbys_Multiply_float(shape, amplitude, shape);
  shape = shape * amplitude;
  // tkbys_Step_float(shape, uvy, shape);
  shape = step(shape, uvy);
  shape = 1.0 - shape;

  // // カラー
  vec4 color;
  color = vec4(0.99, 0.59, 0.85, 0.6);

  // マスター
  vec4 master = color * shape;
  // vec4 master = vec4(vec2(uvtest), 0.0, 1.0);

  gl_FragColor = master;
}
