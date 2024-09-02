def write_to_file(file_name, number)
	file = File.new(file_name, "w");
	file.puts(number);
	index = 0;
	while (index < number)
		file.puts(index);
		index += 1;
	end
	file.close();
end

def read_from_file(file_name)
	file = File.new(file_name, "r");
	count = file.gets().chomp();
	if (!is_numeric?(count))
		puts("Error: first line of file is not a number");
		return;
	end
	count = count.to_i();
	index = 0;
	while (index < count)
		line = file.gets().chomp();
		puts("Line read: #{line}");
		index += 1;
	end
	file.close();
end

def main()
	write_to_file("mydata.txt", 10);
	read_from_file("mydata.txt");
end

def is_numeric?(obj)
	if (/[^0-9]/.match(obj) == nil)
		return true;
	end
	return false;
end

main();

