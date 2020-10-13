void tkbys_Posterize_float(float In, float Steps, out float Out)
{
    Out = floor(In / (1.0 / Steps)) * (1.0 / Steps);
}