uniform sampler2D tDiffuse;
uniform float time;
uniform float contrastR;
uniform float contrastG;
uniform float contrastB;
uniform float brightness;
uniform float lineScaleR;
uniform float lineScaleG;
uniform float lineScaleB;
uniform float discardAlpha;

uniform float u_ripple_strength;
uniform float u_ripple_offset;
uniform float u_ripple_frequency;
uniform float u_ripple_center_uv_x;
uniform float u_ripple_center_uv_y;
uniform float u_ripple_sine_disappear_distance;

varying vec2 vUv;

float contrast(float src, float c) {
  src = (src - 0.5) / (1.0 - c * 0.01) + 0.5;
  return src;
}

float line(float src, vec2 v, float scale) {
  if(scale > 1.0) {
    src = src * (sin(v.x + v.y) + scale * 0.01);
  }
  return src;
}

vec2 GetRippleDistortedUv(
    float distance_source_u,
    float distance_source_v,
    float distort_source_u,
    float distort_source_v,
    float distance_center_x,
    float distance_center_y)
{
    float distance_square = (distance_source_u - distance_center_x) * (distance_source_u - distance_center_x)
        + (distance_source_v - distance_center_y) * (distance_source_v - distance_center_y);

    float distance = sqrt(distance_square);
    float sine_disappear_distance = u_ripple_sine_disappear_distance;
    float normalized_distance = clamp(distance, 0.0, sine_disappear_distance) / sine_disappear_distance;
    float sine_strength = u_ripple_strength * (1.0 - normalized_distance) * (1.0 - normalized_distance);
    float theta = sin(u_ripple_offset + distance * u_ripple_frequency) * sine_strength;

    float u0 = distort_source_u - 0.5;
    float v0 = distort_source_v - 0.5;
    float u1 = u0 * cos(theta) - v0 * sin(theta);
    float v1 = u0 * sin(theta) + v0 * cos(theta);
    float u2 = u1 + 0.5;
    float v2 = v1 + 0.5;
    return vec2(u2, v2);

    // return vec2(distance_source_u, distance_source_v);
}


void main(void) {

  vec4 dest = texture2D(tDiffuse, vUv);

  dest.r = contrast(dest.r, contrastR);
  dest.g = contrast(dest.g, contrastG);
  dest.b = contrast(dest.b, contrastB);

  if(dest.a > 0.0) {
    dest.r = line(dest.r, gl_FragCoord.xy * lineScaleR * 0.01, lineScaleR);
    dest.g = line(dest.g, gl_FragCoord.xy * lineScaleG * 0.01, lineScaleG);
    dest.b = line(dest.b, gl_FragCoord.xy * lineScaleB * 0.01, lineScaleB);
  }
  dest.rgb += brightness * 0.01;
  if(dest.a <= discardAlpha * 0.01) {
    discard;
  }

  gl_FragColor = dest;


  // float u = vUv.x;
  // float v = vUv.y;

  // vec4 test = texture2D(tDiffuse, GetRippleDistortedUv(u, v, u, v, u_ripple_center_uv_x, u_ripple_center_uv_y));
  // gl_FragColor = test;
}
