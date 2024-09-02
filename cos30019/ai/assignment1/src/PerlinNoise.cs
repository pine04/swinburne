using System;

namespace Assignment1 {
    // Calculates the perlin noise value for a position.
    public static class PerlinNoise {
        // The permutation array is used to obtain the random vectors for each grid intersection.
        private static readonly int[] Permutation = new int[] { 151, 160, 137,  91,  90,  15, 131,  13, 201,  95,  96,  53, 194, 233,   7, 225,
                                                                140,  36, 103,  30,  69, 142,   8,  99,  37, 240,  21,  10,  23, 190,   6, 148,
                                                                247, 120, 234,  75,   0,  26, 197,  62,  94, 252, 219, 203, 117,  35,  11,  32,
                                                                57, 177,  33,  88, 237, 149,  56,  87, 174,  20, 125, 136, 171, 168,  68, 175,
                                                                74, 165,  71, 134, 139,  48,  27, 166,  77, 146, 158, 231,  83, 111, 229, 122,
                                                                60, 211, 133, 230, 220, 105,  92,  41,  55,  46, 245,  40, 244, 102, 143,  54,
                                                                65,  25,  63, 161,   1, 216,  80,  73, 209,  76, 132, 187, 208,  89,  18, 169,
                                                                200, 196, 135, 130, 116, 188, 159,  86, 164, 100, 109, 198, 173, 186,   3,  64,
                                                                52, 217, 226, 250, 124, 123,   5, 202,  38, 147, 118, 126, 255,  82,  85, 212,
                                                                207, 206,  59, 227,  47,  16,  58,  17, 182, 189,  28,  42, 223, 183, 170, 213,
                                                                119, 248, 152,   2,  44, 154, 163,  70, 221, 153, 101, 155, 167,  43, 172,   9,
                                                                129,  22,  39, 253,  19,  98, 108, 110,  79, 113, 224, 232, 178, 185, 112, 104,
                                                                218, 246,  97, 228, 251,  34, 242, 193, 238, 210, 144,  12, 191, 179, 162, 241,
                                                                81,  51, 145, 235, 249,  14, 239, 107,  49, 192, 214,  31, 181, 199, 106, 157,
                                                                184,  84, 204, 176, 115, 121,  50,  45, 127,   4, 150, 254, 138, 236, 205,  93,
                                                                222, 114,  67,  29,  24,  72, 243, 141, 128, 195,  78,  66, 215,  61, 156, 180 };

        // This static constructor doubles the Permutation array to prevent overflow errors.
        static PerlinNoise() {
            int[] newPermutation = new int[Permutation.Length * 2];

            for (int i = 0; i < newPermutation.Length; i++) {
                newPermutation[i] = Permutation[i % Permutation.Length];
            }

            Permutation = newPermutation;
        }
        
        public static bool Step(float value, float threshold) {
            return value >= threshold;
        }

        public static float Perlin(float x, float y) {
            int cellX = (int)Math.Floor(x) % 256;
            int cellY = (int)Math.Floor(y) % 256;

            float u = x - (float)Math.Floor(x);
            float v = y - (float)Math.Floor(y);

            Vector2D<float> topLeft = new Vector2D<float>(u, v);
            Vector2D<float> topRight = new Vector2D<float>(u - 1.0f, v);
            Vector2D<float> bottomLeft = new Vector2D<float>(u, v - 1.0f);
            Vector2D<float> bottomRight = new Vector2D<float>(u - 1.0f, v - 1.0f);

            Vector2D<float> topLeftConstant = GetConstantVector(Permutation[Permutation[cellX] + cellY]);
            Vector2D<float> topRightConstant = GetConstantVector(Permutation[Permutation[cellX + 1] + cellY]);
            Vector2D<float> bottomLeftConstant = GetConstantVector(Permutation[Permutation[cellX] + cellY + 1]);
            Vector2D<float> bottomRightConstant = GetConstantVector(Permutation[Permutation[cellX + 1] + cellY + 1]);

            float dotTopLeft = Vector.Dot(topLeft, topLeftConstant);
            float dotTopRight = Vector.Dot(topRight, topRightConstant);
            float dotBottomLeft = Vector.Dot(bottomLeft, bottomLeftConstant);
            float dotBottomRight = Vector.Dot(bottomRight, bottomRightConstant);

            float su = Smooth(u);
            float sv = Smooth(v);

            return Lerp(su, Lerp(sv, dotTopLeft, dotBottomLeft), Lerp(sv, dotTopRight, dotBottomRight));
        }

        static Vector2D<float> GetConstantVector(int value) {
            switch (value % 4) {
                case 0:
                    return new Vector2D<float>(1, 1);
                case 1:
                    return new Vector2D<float>(1, -1);
                case 2:
                    return new Vector2D<float>(-1, -1);
                case 3:
                default:
                    return new Vector2D<float>(-1, 1);
            }
        }

        static float Lerp(float t, float a, float b) {
            return a + (b - a) * t;
        }

        static float Smooth(float t) {
            return ((6*t - 15)*t + 10)*t*t*t;
        }
    }
}