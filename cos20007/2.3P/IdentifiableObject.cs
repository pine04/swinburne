using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwinAdventure
{
    public class IdentifiableObject
    {
        private List<string> _identifiers;

        public IdentifiableObject(string[] idents)
        {
            _identifiers = new List<string>();

            foreach (string id in idents)
            {
                _identifiers.Add(id);
            }
        }

        public bool AreYou(string id)
        {
            foreach (string ident in _identifiers)
            {
                if (ident.ToLower() == id.ToLower())
                {
                    return true;
                }
            }
            return false;
        }

        public string FirstId
        {
            get
            {
                if (_identifiers.Count == 0)
                {
                    return "";
                }
                else
                {
                    return _identifiers[0];
                }
            }
        }

        public void AddIdentifier(string id)
        {
            _identifiers.Add(id.ToLower());
        }
    }
}
