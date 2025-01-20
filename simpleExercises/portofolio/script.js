//  DOM Elements
const mainElement = document.getElementById("main");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");
const hamburguerMenuButton = document.querySelector(".hamburguerMenuButton");
const fullNav = document.querySelector(".nav");

//  Mouse Movement Handler
function handleMouseMove(e) {
	const rect = e.currentTarget.getBoundingClientRect();
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top - scrollTop;
    console.log("ola")
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
    fullNav.classList.remove("open");
}
function handleHambugerClick(e) {
    fullNav.classList.toggle("open");
}

//  ui update
function updateGradientPosition(x, y) {
	document.documentElement.style.setProperty("--mouse-x", `${x}px`);
	document.documentElement.style.setProperty("--mouse-y", `${y}px`);
}

//  Event Listeners
mainElement.addEventListener("mousemove", handleMouseMove);
navLinks.forEach(function (link) {
	link.addEventListener("click", handleNavClick);
});
hamburguerMenuButton.addEventListener("click", handleHambugerClick);
