﻿namespace SwinAdventure
{
    public class LookCommand : Command
    {
        public LookCommand() : base(new string[] { "look" }) { }

        public override string Execute(Player p, string[] text)
        {
            if (text.Length != 3 && text.Length != 5)
            {
                return "I don't know how to look like that";
            }
            if (text[0] != "look")
            {
                return "Error in look input";
            }
            if (text[1] != "at")
            {
                return "What do you want to look at?";
            }
            if (text.Length == 5 && text[3] != "in")
            {
                return "What do you want to look in?";
            }

            IHaveInventory container = null;
            string itemId = text[2];

            if (text.Length == 3)
            {
                container = p;
            } else if (text.Length == 5)
            {
                container = FetchContainer(p, text[4]);
                if (container == null)
                {
                    return "I cannot find the " + text[4];
                }
            }

            return LookAtIn(itemId, container);            
        }

        private IHaveInventory FetchContainer(Player p, string containerId)
        {
            return p.Locate(containerId) as IHaveInventory;
        }
        
        private string LookAtIn(string thingId, IHaveInventory container)
        {
            GameObject item = container.Locate(thingId);
            if (item != null)
            {
                return item.FullDescription;
            } else
            {
                return "I cannot find the " + thingId + " in the " + container.Name;
            }
        }
    }
}
