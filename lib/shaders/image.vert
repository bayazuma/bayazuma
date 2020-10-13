#pragma glslify: tkbys_Noise_fBM = require("./glslify/procedural/noise/NoiseBetter.glsl")
#pragma glslify: tkbys_Smoothstep_float = require("./glslify/math/range/Smoothstep.glsl")
#pragma glslify: tkbys_Multiply_float = require("./glslify/math/basic/Multiply.glsl")
#pragma glslify: tkbys_Add_vec3 = require("./glslify/math/basic/Add.glsl")

varying vec2 v_texcoord;
uniform float u_uneven_scale;

void main(){
  v_texcoord = uv;

  float noise;
  tkbys_Noise_fBM(uv, u_uneven_scale, noise);
  tkbys_Smoothstep_float(0.37, 1.15, noise, noise);
  noise = 0.8 * noise;
  // tkbys_Multiply_float(noise, 2.0, noise);

  vec3 pos;
  pos = position + vec3(0.0, 0.0, noise);
  // tkbys_Add_vec3(position, vec3(0.0, noise, 0.0), pos);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
