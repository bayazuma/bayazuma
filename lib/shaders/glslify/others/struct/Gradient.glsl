// Unity_SampleGradient_float(NewGradient(0, 3, 2, float4(0.9647059, 0.9647059, 0.9647059, 0.2970626),float4(0.07058824, 1, 0.9686275, 0.6529488),float4(0.7960784, 1, 0.6705883, 1),float4(0, 0, 0, 0),float4(0, 0, 0, 0),float4(0, 0, 0, 0),float4(0, 0, 0, 0),float4(0, 0, 0, 0), float2(1, 0),float2(1, 1),float2(0, 0),float2(0, 0),float2(0, 0),float2(0, 0),float2(0, 0),float2(0, 0)), _Posterize_64E55886_Out_2, _SampleGradient_770161D3_Out_2);
// void Unity_SampleGradient_float(Gradient Gradient, float Time, out float4 Out)
// {
//     float3 color = Gradient.colors[0].rgb;
//     [unroll]
//     for (int c = 1; c < 8; c++)
//     {
//         float colorPos = saturate((Time - Gradient.colors[c-1].w) / (Gradient.colors[c].w - Gradient.colors[c-1].w)) * step(c, Gradient.colorsLength-1);
//         color = lerp(color, Gradient.colors[c].rgb, lerp(colorPos, step(0.01, colorPos), Gradient.type));
//     }
// #ifndef UNITY_COLORSPACE_GAMMA
//     color = SRGBToLinear(color);
// #endif
//     float alpha = Gradient.alphas[0].x;
//     [unroll]
//     for (int a = 1; a < 8; a++)
//     {
//         float alphaPos = saturate((Time - Gradient.alphas[a-1].y) / (Gradient.alphas[a].y - Gradient.alphas[a-1].y)) * step(a, Gradient.alphasLength-1);
//         alpha = lerp(alpha, Gradient.alphas[a].x, lerp(alphaPos, step(0.01, alphaPos), Gradient.type));
//     }
//     Out = float4(color, alpha);
// }


struct Gradient
{
    int type;
    int colorsLength;
    int alphasLength;
    vec4 colors[8];
    vec2 alphas[8];
};

void NewGradient(
    int type, int colorsLength, int alphasLength,
    vec4 colors0, vec4 colors1, vec4 colors2, vec4 colors3, vec4 colors4, vec4 colors5, vec4 colors6, vec4 colors7,
    vec2 alphas0, vec2 alphas1, vec2 alphas2, vec2 alphas3, vec2 alphas4, vec2 alphas5, vec2 alphas6, vec2 alphas7,
    out Gradient Gradient_Out
)
{
  Gradient_Out.type = type;
  Gradient_Out.colorsLength = colorsLength;
  Gradient_Out.colorsLength = alphasLength;
  Gradient_Out.colors[0] = colors0;
  Gradient_Out.colors[1] = colors1;
  Gradient_Out.colors[2] = colors2;
  Gradient_Out.colors[3] = colors3;
  Gradient_Out.colors[4] = colors4;
  Gradient_Out.colors[5] = colors5;
  Gradient_Out.colors[6] = colors6;
  Gradient_Out.colors[7] = colors7;
  Gradient_Out.alphas[0] = alphas0;
  Gradient_Out.alphas[1] = alphas1;
  Gradient_Out.alphas[2] = alphas2;
  Gradient_Out.alphas[3] = alphas3; 
  Gradient_Out.alphas[4] = alphas4;
  Gradient_Out.alphas[5] = alphas5;
  Gradient_Out.alphas[6] = alphas6; 
  Gradient_Out.alphas[7] = alphas7;
}

void tkbys_SampleGradient_float(
  Gradient gradient, float Time, out vec4 Out
)
{
    vec3 color = gradient.colors[0].rgb;
    // [unroll]
    for (int c = 1; c < 8; c++)
    {
        float colorPos = Saturate((Time - gradient.colors[c-1].w) / (gradient.colors[c].w - gradient.colors[c-1].w)) * step(float(c), float(gradient.colorsLength) - 1.0);
        color = mix(color, gradient.colors[c].rgb, mix(colorPos, step(0.01, colorPos), float(gradient.type)));
    }
// #ifndef UNITY_COLORSPACE_GAMMA
//     color = SRGBToLinear(color);
// #endif
    float alpha = gradient.alphas[0].x;
    // [unroll]
    for (int a = 1; a < 8; a++)
    {
        float alphaPos = Saturate((Time - gradient.alphas[a-1].y) / (gradient.alphas[a].y - gradient.alphas[a-1].y)) * step(float(a), float(gradient.alphasLength)-1.0);
        alpha = mix(alpha, gradient.alphas[a].x, mix(alphaPos, step(0.01, alphaPos), float(gradient.type)));
    }
    Out = vec4(color, alpha);
}
