#include <stdio.h>
#include <string.h>
#include "terminal_user_input.h"

#define LOOP_COUNT 60

void print_silly_name(my_string name);

int main()
{
	my_string name;
	name = read_string("What is your name? ");

	if (strcmp(name.str, "Fred") == 0 || strcmp(name.str, "Ted") == 0) {
		printf("Your name %s is an awesome name!\n", name.str);
	} else {
		print_silly_name(name);
	}

	return 0;
}

void print_silly_name(my_string name) {
	printf("Your name %s is a", name.str);
	int i;
	for (i = 0; i < LOOP_COUNT; i++) {
		printf(" silly");
	}
	printf(" name!\n");
}
