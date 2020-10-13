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