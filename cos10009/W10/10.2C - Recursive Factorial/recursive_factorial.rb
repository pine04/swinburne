def factorial(n)
	if (n == 0 || n == 1)
		return 1;
	end
	return n * factorial(n - 1);
end

def main()
	if (ARGV.length() < 1 || ARGV[0].to_i() < 0)
		puts("Incorrect argument - need a single argument with a value of 0 or more.\n");
		return;
	end
	puts(factorial(ARGV[0].to_i()));
end

main();
