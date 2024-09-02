using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwinAdventure
{
    public class CommandProcessor
    {
        private List<Command> _commands;

        public CommandProcessor()
        {
            _commands = new List<Command>()
            {
                new LookCommand(),
                new MoveCommand()
            };
        }

        public string Execute(Player p, string[] text)
        {
            foreach (Command command in _commands)
            {
                if (command.AreYou(text[0]))
                {
                    return command.Execute(p, text);
                }
            }

            return "I don't know how to do that.";
        }
    }
}
