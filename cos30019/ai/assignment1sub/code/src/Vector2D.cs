using System.Numerics;

namespace Assignment1 {
    // Defines a two-dimensional vector of numerical values.
    public struct Vector2D<T> where T : INumber<T> {
        private T _x, _y;

        public Vector2D(T x, T y) {
            _x = x;
            _y = y;
        }

        public T X {
            get { return _x; }
        }

        public T Y {
            get { return _y; }
        }

        public static bool operator ==(Vector2D<T> a, Vector2D<T> b) {
            return a.X == b.X && a.Y == b.Y;
        }

        public static bool operator !=(Vector2D<T> a, Vector2D<T> b) {
            return !(a == b);
        }

        public override bool Equals(object? obj)
        {
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }

    public static class Vector {
        public static T Dot<T>(Vector2D<T> a, Vector2D<T> b) where T : INumber<T> {
            return a.X * b.X + a.Y * b.Y;
        }

        public static Vector2D<T> Add<T>(Vector2D<T> a, Vector2D<T> b) where T : INumber<T> {
            return new Vector2D<T>(a.X + b.X, a.Y + b.Y);
        }
    }
}