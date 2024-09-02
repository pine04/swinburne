require "./input_functions";

def print_silly_name(name)
	if (name == "Ted" || name == "Fred")
		puts(name + " is an awesome name!");
	else
		puts(name + " is a silly name");
	end
end

def main()
  	name = read_string("What is your name?");
  	print_silly_name(name);
end

main();