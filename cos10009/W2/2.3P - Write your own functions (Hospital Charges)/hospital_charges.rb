require "./input_functions";

def read_patient_name()
	name = read_string("Enter patient name: ");
	return name;
end

def calculate_accommodation_charges()
	charge = read_float("Enter the accommodation charges: ");
	return charge;
end

def calculate_theatre_charges()
	charge = read_float("Enter the theatre charges: ");
	return charge;
end

def calculate_pathology_charges()
	charge = read_float("Enter the pathology charges: ");
	return charge;
end

def print_patient_bill(name, total)
	puts("The patient name: #{name}");
	print("The total amount due is: $");
	print_float(total, 2);
end

def create_patient_bill()
	total = 0;
	patient_name = read_patient_name();
	total += calculate_accommodation_charges();
	total += calculate_theatre_charges();
	total += calculate_pathology_charges();
	print_patient_bill(patient_name, total);
end

def main()
	create_patient_bill();
end

main();
