using System;
using SplashKitSDK;

namespace DescendBelow {
    public class Wizard : Enemy {
        private Animation _wizardWalkAnimation;
        private Animation _wizardIdleAnimation;

        public Wizard(Point2D position) : base(position, 42, 42, SplashKit.BitmapNamed("wizard"), SplashKit.VectorTo(0, 0), 200, RandGen.RandomDoubleBetween(2, 4)) {
            _wizardWalkAnimation = SplashKit.AnimationScriptNamed("wizard").CreateAnimation("walk");
            _wizardIdleAnimation = SplashKit.AnimationScriptNamed("wizard").CreateAnimation("idle");
        }

        public override void Attack(Player player)
        {
            Vector2D direction = SplashKit.VectorPointToPoint(Position, player.Position);
            Game.CurrentGame?.AddGameObjectOnScreen(
                new FireballProjectile(Position, direction, 250, ProjectileType.Hostile, 15)
            );
            SplashKit.PlaySoundEffect("fireball");
        }

        public override void Move(Player player) {
            if (SplashKit.PointPointDistance(Position, player.Position) >= 288) {
                Velocity = SplashKit.VectorMultiply(SplashKit.UnitVector(SplashKit.VectorPointToPoint(Position, player.Position)), 48);
            } else {
                Velocity = SplashKit.VectorTo(0, 0);
            }
        }

        public override void Update(uint fps)
        {
            base.Update(fps);
            _wizardWalkAnimation.Update();
            _wizardIdleAnimation.Update();
        }

        public override void Draw(DrawingOptions options)
        {
            if (SplashKit.IsZeroVector(Velocity)) {
                base.Draw(SplashKit.OptionWithAnimation(_wizardIdleAnimation, options));
            } else {
                base.Draw(SplashKit.OptionWithAnimation(_wizardWalkAnimation, options));
            }
        }
    }
}