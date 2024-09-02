using System.Collections.Generic;

namespace SwinAdventure
{
    public class Location : GameObject, IHaveInventory
    {
        private Inventory _inventory;
        private List<Path> _paths;

        public Location(string[] ids, string name, string desc) : base(ids, name, desc)
        {
            _inventory = new Inventory();
            _paths = new List<Path>();
        }

        public GameObject Locate(string id)
        {
            if (AreYou(id))
            {
                return this;
            } else if (_inventory.HasItem(id))
            {
                return _inventory.Fetch(id);
            } else
            {
                foreach (Path path in _paths)
                {
                    if (path.AreYou(id))
                    {
                        return path;
                    }
                }
            }
            return null;
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

                if (_paths.Count != 0)
                {
                    description += "There are exits ";
                    for (int i = 0; i < _paths.Count; i++)
                    {
                        if (i > 0) description += ", ";
                        description += _paths[i].Name;
                    }
                    description += ".\n";
                } else
                {
                    description += "There are no exits in this room.\n";
                }
                return description;
            }
        }

        public Inventory Inventory
        {
            get { return _inventory; }
        }

        public void AddPath(Path path)
        {
            _paths.Add(path);
        }
    }
}
