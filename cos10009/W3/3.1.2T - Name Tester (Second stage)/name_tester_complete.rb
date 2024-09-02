require "./input_functions";

def print_silly_name(name)
	puts(name + " is a");
	i = 0;
	while (i < 60)
		print("silly ");
		i += 1;
	end
	puts("name!");
end

def validate_name(name)
	if (name == "Ted" || name == "Fred")
		puts("#{name} is an awesome name!");
	else
		print_silly_name(name);
	end
end

def main()
	name = read_string("What is your name?");
	validate_name(name);
end

main();

