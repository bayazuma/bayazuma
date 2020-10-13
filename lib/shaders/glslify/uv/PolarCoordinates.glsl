void tkbys_PolarCoordinates_float(vec2 UV, vec2 Center, float RadialScale, float LengthScale, out vec2 Out)
{
    vec2 delta = UV - Center;
    float radius = length(delta) * 2.0 * RadialScale;
    float angle = atan(delta.x, delta.y) * 1.0/6.28 * LengthScale;
    Out = vec2(radius, angle);
}