void tkbys_Blend_Overlay_vec4(vec4 Base, vec4 Blend, out vec4 Out, float Opacity)
{
    vec4 result1 = 1.0 - 2.0 * (1.0 - Base) * (1.0 - Blend);
    vec4 result2 = 2.0 * Base * Blend;
    vec4 zeroOrOne = step(Base, vec4(0.5));
    Out = result2 * zeroOrOne + (1.0 - zeroOrOne) * result1;
    Out = mix(Base, Out, Opacity);
}
#pragma glslify: export(tkbys_Blend_Overlay_vec4)