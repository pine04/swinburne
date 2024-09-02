namespace SwinAdventure
{
    public class Player : GameObject, IHaveInventory
    {
        private Inventory _inventory;
        private Location _location;

        public Player(string name, string desc, Location initialLocation) : base(new string[] { "me", "inventory" }, name, desc)
        {
            _inventory = new Inventory();
            _location = initialLocation;
        }

        public GameObject Locate(string id)
        {
            if (AreYou(id))
            {
                return this;
            } 
            if (_inventory.HasItem(id))
            {
                return _inventory.Fetch(id);
            }
            return _location.Locate(id);
        }

        public override string FullDescription
        {
            get
            {
                return "You are " + Name + ", " + base.FullDescription + ". You are carrying:\n" + _inventory.ItemList;
            }
        }

        public Inventory Inventory
        {
            get { return _inventory; }
        }

        public Location Location
        {
            get { return _location; }
            set { _location = value; }
        }
    }
}
