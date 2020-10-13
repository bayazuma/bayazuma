// smooth step
// x,y間をスムーズに補間
void tkbys_Smoothstep_float(float Edge1, float Edge2, float In, out float Out)
{
    Out = smoothstep(Edge1, Edge2, In);
}

#pragma glslify: export(tkbys_Smoothstep_float)
