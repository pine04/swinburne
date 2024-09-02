using SplashKitSDK;
using System.IO;
using System;

namespace ShapeDrawer
{
    public class Drawing
    {
        private readonly List<Shape> _shapes;
        private Color _background;

        public Drawing(Color background)
        {
            _shapes = new List<Shape>();
            _background = background;
        }

        public Drawing() : this(Color.White) { }

        public int ShapeCount
        {
            get { return _shapes.Count; }
        }

        public Color Background
        {
            get { return _background; }
            set { _background = value; }
        }

        public List<Shape> SelectedShapes
        {
            get
            {
                List<Shape> result = new List<Shape>();
                foreach (Shape s in _shapes)
                {
                    if (s.Selected)
                    {
                        result.Add(s);
                    }
                }
                return result;
            }
        }

        public void Draw()
        {
            SplashKit.ClearScreen(_background);
            foreach (Shape s in _shapes)
            {
                s.Draw();
            }
        }

        public void SelectShapesAt(Point2D pt)
        {
            foreach (Shape s in _shapes)
            {
                s.Selected = s.IsAt(pt);
            }
        }

        public void AddShape(Shape s)
        {
            _shapes.Add(s);
        }

        public void RemoveShape(Shape s)
        {
            _shapes.Remove(s);
        }

        public void Save(string filename)
        {
            StreamWriter writer = new StreamWriter(filename);
            
            try
            {
                writer.WriteColor(Background);
                writer.WriteLine(ShapeCount);

                foreach (Shape s in _shapes)
                {
                    s.SaveTo(writer);
                }
            } finally
            {
                writer.Close();
            }
        }

        public void Load(string filename)
        {
            StreamReader reader = new StreamReader(filename);

            try
            {
                Background = reader.ReadColor();

                int count = reader.ReadInteger();
                string kind;
                Shape s;
                _shapes.Clear();
                for (int i = 0; i < count; i++)
                {
                    kind = reader.ReadLine();
                    if (kind == "Rectangle")
                    {
                        s = new MyRectangle();
                    } else if (kind == "Circle")
                    {
                        s = new MyCircle();
                    } else if (kind == "Line")
                    {
                        s = new MyLine();
                    } else
                    {
                        throw new InvalidDataException("Unknown shape kind: " + kind);
                    }

                    s.LoadFrom(reader);
                    AddShape(s);
                }
            } finally
            {
                reader.Close();
            }
        }
    }
}
