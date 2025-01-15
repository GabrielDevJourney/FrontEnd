document.getElementById("main").addEventListener("mousemove", (e) => {
	const rect = e.currentTarget.getBoundingClientRect();
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top - scrollTop;

	//update the gradient overlay position variables
	document.documentElement.style.setProperty("--mouse-x", `${x}px`);
	document.documentElement.style.setProperty("--mouse-y", `${y}px`);
});

// Get all sections and navigation links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

// Add click event listeners to nav links
navLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		// Remove active class from all links
		navLinks.forEach((link) => link.classList.remove("active"));
		// Add active class to clicked link
		e.target.classList.add("active");
	});
});
