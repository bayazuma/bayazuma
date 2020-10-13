void tkbys_Rotate_Radians_vec2(vec2 UV, vec2 Center, float Rotation, out vec2 Out)
{
  //rotation matrix
  UV -= Center;
  float s = sin(Rotation);
  float c = cos(Rotation);

  //center rotation matrix
  mat2 rMatrix = mat2(c, -s, s, c);
  rMatrix *= 0.5;
  rMatrix += 0.5;
  rMatrix = rMatrix*2.0 - 1.0;

  //multiply the UVs by the rotation matrix
  UV.xy = UV.xy * rMatrix;
  UV += Center;

  Out = UV;
}