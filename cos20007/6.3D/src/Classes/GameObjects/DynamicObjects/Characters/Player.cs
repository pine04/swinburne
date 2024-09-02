using SplashKitSDK;

namespace DescendBelow {
    public class Player : Character {
        private Weapon _weapon;
        private uint _timeSinceLastHit, _timeSinceLastRegen;
        private Animation _playerIdleAnimation;
        private Animation _playerWalkAnimation;

        public Player(Point2D position, Vector2D initialVelocity, int maxHealth) : base(position, 42, 42, SplashKit.BitmapNamed("player"), initialVelocity, maxHealth, 20) {
            _weapon = new Bow(25, .5);
            _timeSinceLastHit = 0;
            _timeSinceLastRegen = 0;

            _playerIdleAnimation = SplashKit.AnimationScriptNamed("player").CreateAnimation("idle");
            _playerWalkAnimation = SplashKit.AnimationScriptNamed("player").CreateAnimation("walk");
        }

        public void Halt() {
            Velocity = SplashKit.VectorTo(0, 0);
        }

        public void MoveAlong(Vector2D direction) {
            Velocity = SplashKit.VectorAdd(Velocity, SplashKit.VectorMultiply(direction, 150));
        }

        public void Attack(Point2D target) {
            _weapon.Attack(_position, target);
        }

        public override void Damage(int amount)
        {
            base.Damage(amount);
            _timeSinceLastHit = SplashKit.TimerTicks("gameTimer");
            SplashKit.PlaySoundEffect("hurt");
        }

        private void Regenerate() {
            Heal(1);
            _timeSinceLastRegen = SplashKit.TimerTicks("gameTimer");
        }

        public override void Update(uint fps)
        {
            base.Update(fps);
            if (SplashKit.TimerTicks("gameTimer") - _timeSinceLastHit >= 3000 && SplashKit.TimerTicks("gameTimer") - _timeSinceLastRegen >= 500) {
                Regenerate();
            }

            _playerIdleAnimation.Update();
            _playerWalkAnimation.Update();
        }

        public override void Draw(DrawingOptions options) {
            if (SplashKit.IsZeroVector(Velocity)) {
                base.Draw(SplashKit.OptionWithAnimation(_playerIdleAnimation, options));
            } else {
                base.Draw(SplashKit.OptionWithAnimation(_playerWalkAnimation, options));
            }
        }

        public void DrawPlayerStats(double x, double y) {
            SplashKit.DrawBitmap("heart", x, y);
            SplashKit.DrawText(_health + "/" + _maxHealth, Color.White, "pixel", 32, x + 64, y + 8);
            _weapon.DrawWeaponStat(x + 256, y + 4);
        }
    }
}