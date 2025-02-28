const input = document.querySelector("#input");
const button = document.querySelector("#btn");
const list = document.querySelector("#list");
let listArray = [];

// Load tasks on page load
window.addEventListener("load", () => {
	const storedList = localStorage.getItem("listArray");
	if (storedList) {
		listArray = JSON.parse(storedList);
		listArray.forEach((item) => {
			addTaskToDOM(item);
		});
		counterLimit = listArray.length;
	}
});

button.addEventListener("click", () => {
	// Early return so if any comes true it will end event
	if (checkLimitCounter() || checkRepetitions()) {
		return;
	}
	addTask();
});

function addTask() {
	const taskText = input.value;
	addTaskToDOM(taskText);
	listArray.push(taskText);
	input.value = "";
	localStorage.setItem("listArray", JSON.stringify(listArray));
}

function addTaskToDOM(taskText) {
	const deleteButton = document.createElement("button");
	deleteButton.classList.add("delete");
	deleteButton.textContent = "Delete";

	deleteButton.addEventListener("click", (event) => {
		event.target.parentElement.remove();
		const index = listArray.indexOf(taskText);
		listArray.splice(index, 1);
		localStorage.setItem("listArray", JSON.stringify(listArray));
	});

	const li = document.createElement("li");
	li.textContent = taskText;
    li.appendChild(deleteButton);   
	list.appendChild(li);
}

function checkLimitCounter() {
	if (listArray.length == 5) {
		alert("You have reached the limit of 5 items!");
		return true;
	}
	return false;
}

function checkRepetitions() {
	if (listArray.includes(input.value)) {
		alert("You have already added this item!");
		input.value = "";
		return true;
	}
	return false;
}
