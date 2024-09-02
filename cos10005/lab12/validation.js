function validateForm() {
	let message = document.getElementById("message").value;
	let studentId = document.getElementById("student-id").value;
	
	let errorMsg = "";

	if (message === "") {
		errorMsg += "Message cannot be empty.\n";
	}
	if (studentId === "") {
		errorMsg += "Student ID cannot be empty.\n";
	}
	if (studentId.indexOf("s") !== 0) {
		errorMsg += "Student ID must start with 's'.";
	}

	if (errorMsg !== "") {
		alert(errorMsg);
		return false;
	}
	
	return true;
}

function init() {
	var msgForm = document.getElementById("msgform");
	msgForm.onsubmit = validateForm;
}

window.onload = init;

function describeNumber(n) {
	var ans = "";

	if (n >= 1 && n <= 9) {
		ans = "You entered a number between 1 and 9.";
	} else if (n >= 10 && n <= 19) {
		ans = "You entered a number between 10 and 19.";
	} else if (n >= 20 && n <= 29) {
		ans = "You entered a number between 20 and 29.";
	} else if (n >= 30 && n <= 39) {
		ans = "You entered a number between 30 and 39.";
	} else if (n < 1 || n > 39) {
		ans = "You entered a number less than 1 or greater than 39.";
	} else {
		ans = "You did not enter a number!";
	}

	return ans;
}

let n = prompt("Enter a number");
let ans = describeNumber(n);
alert(ans);