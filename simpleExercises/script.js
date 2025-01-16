//  DOM Elements
const mainElement = document.getElementById("main");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

//  Mouse Movement Handler
function handleMouseMove(e) {
	const rect = e.currentTarget.getBoundingClientRect();
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top - scrollTop;

	updateGradientPosition(x, y);
}

//  Navigation Handlers
function handleNavClick(e) {
	// Remove active class from all links
	navLinks.forEach(function (link) {
		link.classList.remove("active");
	});
	// Add active class to clicked link
	e.target.classList.add("active");
}

//  Utility Functions
function updateGradientPosition(x, y) {
	document.documentElement.style.setProperty("--mouse-x", `${x}px`);
	document.documentElement.style.setProperty("--mouse-y", `${y}px`);
}

//  Event Listeners
mainElement.addEventListener("mousemove", handleMouseMove);
navLinks.forEach(function (link) {
	link.addEventListener("click", handleNavClick);
});
