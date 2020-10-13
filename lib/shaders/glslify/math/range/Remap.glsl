// map
// void Unity_Remap_float(float In, float2 InMinMax, float2 OutMinMax, out float Out)
// {
//     Out = OutMinMax.x + (In - InMinMax.x) * (OutMinMax.y - OutMinMax.x) / (InMinMax.y - InMinMax.x);
// }
void tkbys_Remap_float(float In, vec2 InMinMax, vec2 OutMinMax, out float Out)
{
    Out = OutMinMax.x + (In - InMinMax.x) * (OutMinMax.y - OutMinMax.x) / (InMinMax.y - InMinMax.x);
}