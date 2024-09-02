using SplashKitSDK;
using System.IO;
using System;

namespace ShapeDrawer
{
    public class MyCircle : Shape
    {
        private int _radius;

        public MyCircle(Color color, float x, float y, int radius) : base(color) 
        {
            X = x;
            Y = y;
            Radius = radius;
        }

        public MyCircle() : this(Color.Blue, 0, 0, 50) { }

        public int Radius 
        {
            get { return _radius; }
            set { _radius = value; }
        }

        public override void Draw()
        {
            if (Selected)
            {
                DrawOutline();
            }
            SplashKit.FillCircle(Color, X, Y, Radius);
        }

        public override void DrawOutline()
        {
            SplashKit.FillCircle(Color.Black, X, Y, Radius + 2);
        }

        public override bool IsAt(Point2D pt)
        {
            Point2D center = new Point2D();
            center.X = X;
            center.Y = Y;

            Circle circle = new Circle();
            circle.Center = center;
            circle.Radius = Radius;

            return SplashKit.PointInCircle(pt, circle);
        }

        public override void SaveTo(StreamWriter writer)
        {
            writer.WriteLine("Circle");
            base.SaveTo(writer);
            writer.WriteLine(Radius);
        }

        public override void LoadFrom(StreamReader reader)
        {
            base.LoadFrom(reader);
            Radius = reader.ReadInteger();
        }
    }
}
