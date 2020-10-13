// vec2 tkbys_GradientNoise_Dir_float(vec2 p)
// {
//     // Permutation and hashing used in webgl-nosie goo.gl/pX7HtC
//     p = p % 289.0;
//     float x = (34.0 * p.x + 1.0) * p.x % 289.0 + p.y;
//     x = (34.0 * x + 1.0) * x % 289.0;
//     x = fract(x / 41.0) * 2.0 - 1.0;
//     return normalize(vec2(x - floor(x + 0.5), abs(x) - 0.5));
// }

// 浮動小数点の精度不足でSP, TBがおかしくなるため、以下を利用する
// https://qiita.com/7CIT/items/e48eff9dc755732fe8a0
highp vec2 tkbys_GradientNoise_Dir_float(vec2 p){
    highp float a = 289.0;
    highp float b = 34.0;
    highp float c = 1.0;
    highp float d = 41.0;
    highp float e = 2.0;
    highp float f = 0.5;

    p = mod(p, a);
    highp float x = (b * p.x + c) * mod(p.x, a) + p.y;
    x = (b * x + c) * mod(x, a);
    x = fract(x / d) * e - c;
    return normalize(vec2(x - floor(x + f), abs(x) - f));
}

void tkbys_GradientNoise_float(vec2 UV, float Scale, out float Out)
{ 
    vec2 p = UV * Scale;
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float d00 = dot(tkbys_GradientNoise_Dir_float(ip), fp);
    float d01 = dot(tkbys_GradientNoise_Dir_float(ip + vec2(0.0, 1.0)), fp - vec2(0.0, 1.0));
    float d10 = dot(tkbys_GradientNoise_Dir_float(ip + vec2(1.0, 0.0)), fp - vec2(1.0, 0.0));
    float d11 = dot(tkbys_GradientNoise_Dir_float(ip + vec2(1.0, 1.0)), fp - vec2(1.0, 1.0));
    fp = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);
    Out = mix(mix(d00, d01, fp.y), mix(d10, d11, fp.y), fp.x) + 0.5;
}