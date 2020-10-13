
// UVのタイリング、オフセットを設定
// Offset: UV自体の座標を移動するパラメーターです。
// Tiling: シェーダーの表示エリアに0-1のUV座標を何回繰り返すかを指定します。
void tkbys_TilingAndOffset_vec2(vec2 UV, vec2 Tiling, vec2 Offset, out vec2 Out)
{
    Out = UV * Tiling + Offset;
}

#pragma glslify: export(tkbys_TilingAndOffset_vec2)