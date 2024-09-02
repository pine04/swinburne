using System;
using SplashKitSDK;

namespace DescendBelow {
    // Represents an interactable object that takes the player to a new floor when clicked on.
    public class Staircase : Interactable {
        public Staircase(Point2D position) : base(position, 45, 36, SplashKit.BitmapNamed("staircase"), 72) { }

        public override void HandleInteraction()
        {
            Game.CurrentGame?.EnterNewFloor();
        }
    }
}