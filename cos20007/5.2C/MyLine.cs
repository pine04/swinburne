using SplashKitSDK;
using System.IO;
using System;

namespace ShapeDrawer
{
    public class MyLine : Shape
    {
        private float _endX, _endY;

        public MyLine(Color color, float startX, float startY, float endX, float endY): base(color)
        {
            X = startX;
            Y = startY;
            EndX = endX;
            EndY = endY;
        }

        public MyLine() : this(Color.Red, 0, 0, 30, 0) { }

        public float EndX
        {
            get { return _endX; }
            set { _endX = value; }
        }

        public float EndY
        {
            get { return _endY; }
            set { _endY = value; }
        }

        public override void Draw()
        {
            if (Selected)
            {
                DrawOutline();
            }
            SplashKit.DrawLine(Color, X, Y, EndX, EndY);
        }

        public override void DrawOutline()
        {
            SplashKit.FillCircle(Color.Black, X, Y, 5);
            SplashKit.FillCircle(Color.Black, EndX, EndY, 5);
        }

        public override bool IsAt(Point2D pt)
        {
            Point2D start = new Point2D();
            start.X = X;
            start.Y = Y;

            Point2D end = new Point2D();
            end.X = EndX;
            end.Y = EndY;

            Line line = new Line();
            line.StartPoint = start;
            line.EndPoint = end;

            return SplashKit.PointOnLine(pt, line);
        }

        public override void SaveTo(StreamWriter writer)
        {
            writer.WriteLine("Line");
            base.SaveTo(writer);
            writer.WriteLine(EndX);
            writer.WriteLine(EndY);
        }

        public override void LoadFrom(StreamReader reader)
        {
            base.LoadFrom(reader);
            EndX = reader.ReadInteger();
            EndY = reader.ReadInteger();
        }
    }
}
