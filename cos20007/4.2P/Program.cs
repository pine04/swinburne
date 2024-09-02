using SplashKitSDK;

namespace ShapeDrawer
{
    public class Program
    {
        private enum ShapeKind
        {
            Rectangle,
            Circle,
            Line
        }

        public static void Main()
        {
            Window window = new Window("Shape Drawer", 800, 600);
            Drawing myDrawing = new Drawing(Color.Beige);
            ShapeKind kindToAdd = ShapeKind.Circle;

            float lineStartX = 0, lineStartY = 0, lineEndX = 0, lineEndY = 0;
            bool waitingSecondPt = false;

            do
            {
                SplashKit.ProcessEvents();

                if (kindToAdd != ShapeKind.Line && SplashKit.MouseClicked(MouseButton.LeftButton))
                {
                    myDrawing.DeselectShapes();
                    
                    Shape shape;
                    
                    if (kindToAdd == ShapeKind.Circle)
                    {
                        shape = new MyCircle();
                    } else
                    {
                        shape = new MyRectangle();
                    }

                    shape.X = SplashKit.MouseX();
                    shape.Y = SplashKit.MouseY();

                    myDrawing.AddShape(shape);
                }

                if (kindToAdd == ShapeKind.Line && SplashKit.MouseClicked(MouseButton.LeftButton))
                {
                    myDrawing.DeselectShapes();
                    
                    if (!waitingSecondPt)
                    {
                        lineStartX = SplashKit.MouseX();
                        lineStartY = SplashKit.MouseY();
                        waitingSecondPt = true;
                    } else
                    {
                        lineEndX = SplashKit.MouseX();
                        lineEndY = SplashKit.MouseY();

                        MyLine line = new MyLine(Color.Red, lineStartX, lineStartY, lineEndX, lineEndY);
                        myDrawing.AddShape(line);

                        waitingSecondPt = false;
                    }
                }

                if (SplashKit.KeyTyped(KeyCode.SpaceKey))
                {
                    myDrawing.Background = SplashKit.RandomRGBColor(255);
                }

                if (SplashKit.MouseClicked(MouseButton.RightButton))
                {
                    Point2D clickLocation = new Point2D();
                    clickLocation.X = SplashKit.MouseX();
                    clickLocation.Y = SplashKit.MouseY();
                    myDrawing.SelectShapesAt(clickLocation);
                }

                if (SplashKit.KeyTyped(KeyCode.DeleteKey) || SplashKit.KeyTyped(KeyCode.BackspaceKey))
                {
                    foreach (Shape s in myDrawing.SelectedShapes)
                    {
                        myDrawing.RemoveShape(s);
                    }
                }

                if (SplashKit.KeyTyped(KeyCode.RKey))
                {
                    kindToAdd = ShapeKind.Rectangle;
                    waitingSecondPt = false;
                } else if (SplashKit.KeyTyped(KeyCode.CKey))
                {
                    kindToAdd = ShapeKind.Circle;
                    waitingSecondPt = false;
                } else if (SplashKit.KeyTyped(KeyCode.LKey))
                {
                    kindToAdd = ShapeKind.Line;
                }

                SplashKit.ClearScreen();

                myDrawing.Draw();

                SplashKit.DrawText("Drawing: " + kindToAdd, Color.Black, 0, 0);

                if (waitingSecondPt)
                {
                    SplashKit.DrawText("Line starting point chosen. Click on another location to select the end point!", Color.Red, 0, 20);
                }

                SplashKit.RefreshScreen();
            } while (!window.CloseRequested);
        }
    }
}
