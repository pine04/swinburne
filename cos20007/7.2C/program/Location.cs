namespace SwinAdventure
{
    public class Location : GameObject, IHaveInventory
    {
        private Inventory _inventory;

        public Location(string[] ids, string name, string desc) : base(ids, name, desc)
        {
            _inventory = new Inventory();
        }

        public GameObject Locate(string id)
        {
            if (AreYou(id))
            {
                return this;
            } else
            {
                return _inventory.Fetch(id);
            }
        }

        public override string FullDescription
        {
            get
            {
                string description = "You are in " + Name + ".\n";

                if (_inventory.ItemList != "")
                {
                    description += "In this room you can see:\n" + _inventory.ItemList;
                } else
                {
                    description += "You don't see any items in this room.\n";
                }
                return description;
            }
        }

        public Inventory Inventory
        {
            get { return _inventory; }
        }
    }
}
