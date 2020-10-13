float tkbys_SimpleNoise_RandomValue_float (vec2 uv)
{
    return fract(sin(dot(uv, vec2(12.9898, 78.233)))*43758.5453);
}

float tkbys_SimpleNnoise_Interpolate_float (float a, float b, float t)
{
    return (1.0-t)*a + (t*b);
}

float tkbys_SimpleNoise_ValueNoise_float (vec2 uv)
{
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);

    uv = abs(fract(uv) - 0.5);
    vec2 c0 = i + vec2(0.0, 0.0);
    vec2 c1 = i + vec2(1.0, 0.0);
    vec2 c2 = i + vec2(0.0, 1.0);
    vec2 c3 = i + vec2(1.0, 1.0);
    float r0 = tkbys_SimpleNoise_RandomValue_float(c0);
    float r1 = tkbys_SimpleNoise_RandomValue_float(c1);
    float r2 = tkbys_SimpleNoise_RandomValue_float(c2);
    float r3 = tkbys_SimpleNoise_RandomValue_float(c3);

    float bottomOfGrid = tkbys_SimpleNnoise_Interpolate_float(r0, r1, f.x);
    float topOfGrid = tkbys_SimpleNnoise_Interpolate_float(r2, r3, f.x);
    float t = tkbys_SimpleNnoise_Interpolate_float(bottomOfGrid, topOfGrid, f.y);
    return t;
}
void tkbys_SimpleNoise_float(vec2 UV, float Scale, out float Out)
{
    float t = 0.0;

    float freq = pow(2.0, float(0));
    float amp = pow(0.5, float(3-0));
    t += tkbys_SimpleNoise_ValueNoise_float(vec2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

    freq = pow(2.0, float(1));
    amp = pow(0.5, float(3-1));
    t += tkbys_SimpleNoise_ValueNoise_float(vec2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

    freq = pow(2.0, float(2));
    amp = pow(0.5, float(3-2));
    t += tkbys_SimpleNoise_ValueNoise_float(vec2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

    Out = t;
}