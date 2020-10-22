#pragma glslify: tkbys_OneMinus_vec4 = require("./glslify/math/range/OneMinus.glsl")
#pragma glslify: tkbys_Multiply_vec4 = require("./glslify/math/basic/Multiply.glsl")
#pragma glslify: tkbys_Blend_Overlay_vec4 = require("./glslify/artistic/blend/Blend_Overlay.glsl")
#pragma glslify: tkbys_Noise_fBM = require("./glslify/procedural/noise/NoiseBetter.glsl")
#pragma glslify: tkbys_Smoothstep_float = require("./glslify/math/range/Smoothstep.glsl")
#pragma glslify: tkbys_Add_vec4 = require("./glslify/math/basic/Add.glsl")

uniform sampler2D u_texture;
uniform sampler2D u_texture_mask;
uniform float u_time;
uniform float u_noise_scale;
uniform float u_blend_opacity;
uniform float u_mix_opacity;

varying vec2 v_texcoord;


void main(void) {
  // val
  float time = u_time;
  float val_noise_scale = u_noise_scale;
  float val_blend = u_blend_opacity;
  float val_mix_opacity = u_mix_opacity;

  // uv
  // vec2 uv = (gl_FragCoord.xy / u_resolution.xx);

  // tex
  vec4 tex = texture2D(u_texture, v_texcoord);
  vec4 tex_mask = texture2D(u_texture_mask, v_texcoord);
  tkbys_OneMinus_vec4(tex_mask, tex_mask);
  tkbys_Multiply_vec4(tex, tex_mask, tex);

  // blend
  vec4 blend;
  vec4 color = vec4(1.0);
  tkbys_Blend_Overlay_vec4(tex, color, blend, val_blend);

  // noise
  float noise;
  tkbys_Noise_fBM(v_texcoord, val_noise_scale, noise);
  tkbys_Smoothstep_float(0.05, 0.82, noise, noise);

  // mix
  vec4 mixes;
  tkbys_Multiply_vec4(vec4(noise), vec4(tex_mask.rgb, 1.0), mixes);
  tkbys_Multiply_vec4(mixes, vec4(val_mix_opacity), mixes);
  tkbys_Add_vec4(mixes, blend, mixes);

  // マスター
  vec4 master;
  master = vec4(mixes.rgb, 1.0);

  gl_FragColor = master;

  // Alpha Clip Threshold
  // float cutoff = 0.1;
  // if(mixes.r + mixes.g + mixes.b < cutoff) discard;
}
