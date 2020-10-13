// Edgeの入力値以上の場合は1を、未満の場合は0を返す
void tkbys_Step_float(float Edge, float In, out float Out)
{
    Out = step(Edge, In);
}

#pragma glslify: export(tkbys_Step_float)

void tkbys_Step_vec2(vec2 Edge, vec2 In, out vec2 Out)
{
    Out = step(Edge, In);
}

#pragma glslify: export(tkbys_Step_vec2)