require "date";
require "./input_functions";

INCHES = 39.3701;

def main()
    name = read_string("What is your name?");
    puts("Your name is " + name + "!");

    family_name = read_string("What is your family name?");
    puts("Your family name is: " + family_name + "!");

    year_born = read_integer("What year were you born?");
    age = Date.today().year() - year_born;
    puts("So you are " + age.to_s() + " years old");

    height_meters = read_float("Enter your height in metres (i.e as a float): ");
    height_inches = height_meters * INCHES;
    puts("Your height in inches is: ");
    puts(height_inches);

    puts("Finished");
    continue = read_boolean("Do you want to continue?");
    if (continue)
        puts("Ok lets continue");
    else
        puts("ok, goodbye");
    end
end

main();
