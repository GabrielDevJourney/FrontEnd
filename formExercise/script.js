const ageInput = document.getElementById("userAge");
const ageValue = document.getElementById("ageValue");
const userForm = document.getElementById("userForm");
const dataDisplay = document.getElementById("data");

ageInput.addEventListener("input", () => {
	ageValue.textContent = ageInput.value;
});

function validatePassword(password) {
	const requirements = {
		uppercase: /[A-Z]/,
		lowercase: /[a-z]/,
		number: /[0-9]/,
		special: /[#?!@$%^&*-]/,
		length: /.{8,}/,
	};

	return Object.values(requirements).every((regex) => regex.test(password));
}

userForm.addEventListener("submit", function (e) {
	e.preventDefault();

	const formData = new FormData(this);
	const hobbies = formData.getAll("hobbies");
	const passwordInput = document.getElementById("password");

	if (!validatePassword(passwordInput.value)) {
		passwordInput.classList.add("password-error");
		return;
	}

	passwordInput.classList.remove("password-error");
	const displayData = `
                Name: ${formData.get("name")}<br>
                Cell Phone: +351${formData.get("phone")}<br>
                Genre: ${formData.get("genre")}<br>
                Email: ${formData.get("email")}<br>
                Password: ${formData.get("password")}<br>
                Hobbies: ${hobbies.join(", ") || "None selected"}<br>
                Age: ${formData.get("age")}
            `;

	data.innerHTML = displayData;
    data.style.display = "block";
});
