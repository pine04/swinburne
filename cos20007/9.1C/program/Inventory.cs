using System.Collections.Generic;

namespace SwinAdventure
{
    public class Inventory
    {
        private List<Item> _items;

        public Inventory()
        {
            _items = new List<Item>();
        }

        public bool HasItem(string id)
        {
            foreach (Item item in _items)
            {
                if (item.AreYou(id))
                {
                    return true;
                }
            }
            return false;
        }

        public void Put(Item itm)
        {
            _items.Add(itm);
        }

        public Item Take(string id)
        {
            for (int i = 0; i < _items.Count; i++)
            {
                if (_items[i].AreYou(id))
                {
                    Item item = _items[i];
                    _items.RemoveAt(i);
                    return item;
                }
            }
            return null;
        }

        public Item Fetch(string id)
        {
            for (int i = 0; i < _items.Count; i++)
            {
                if (_items[i].AreYou(id))
                {
                    return _items[i];
                }
            }
            return null;
        }

        public string ItemList
        {
            get
            {
                string itemList = "";
                foreach (Item item in _items)
                {
                    itemList += "\t" + item.ShortDescription + "\n";
                }
                return itemList;
            }
        }
    }
}
