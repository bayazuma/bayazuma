void tkbys_Checkerboard_float(vec2 UV, vec3 ColorA, vec3 ColorB, vec2 Frequency, out vec3 Out)
{
    UV = (UV.xy + 0.5) * Frequency;
    vec4 derivatives = vec4(dFdx(UV), dFdy(UV));
    vec2 duv_length = sqrt(vec2(dot(derivatives.xz, derivatives.xz), dot(derivatives.yw, derivatives.yw)));
    float width = 1.0;
    vec2 distance3 = 4.0 * abs(fract(UV + 0.25) - 0.5) - width;
    vec2 scale = 0.35 / duv_length.xy;
    float freqLimiter = sqrt(clamp(1.1f - max(duv_length.x, duv_length.y), 0.0, 1.0));
    vec2 vector_alpha = clamp(distance3 * scale.xy, -1.0, 1.0);
    float alpha = Saturate(0.5f + 0.5f * vector_alpha.x * vector_alpha.y * freqLimiter);
    Out = mix(ColorA, ColorB, alpha.xxx);
}