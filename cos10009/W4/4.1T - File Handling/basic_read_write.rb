def write_data_to_file(file_name)
	file = File.new(file_name, "w");  
	file.puts("3");
	file.puts("Fred");
	file.puts("Sam");
	file.puts("Jill");
	file.puts("Jenny");
	file.puts("Zorro");
	file.close();
end

def read_data_from_file(file_name)
	file = File.new(file_name, "r");
	count = file.gets.to_i();
	for i in (0...count)
		puts(file.gets());
	end
	file.close();
end

def main()
	write_data_to_file("mydata.txt");
	read_data_from_file("mydata.txt");
end

main();

