function Batata() {
	this.name = "batatas";
}

Batata.prototype.sheldonize = (counter) => {
	for (let i = 0; i < counter; i++) {
		console.log("knock knock batatas");
	}
};
const batata = new Batata();

batata.sheldonize(2);

Array.prototype.sumNumbersOrStrings = function () {
	if (this.every((e) => typeof e === "number")) {
		let result = 0;
		this.forEach((element) => {
			result += element;
		});

		console.log(result);

	} else if (this.every((e) => typeof e === "string")) {
		let result = "";
		this.forEach((element) => {
			result += element + " ";
		});

		console.log(result);

	} else {
		console.log("All elements should be Numbers or Strings");
	}
};

[1, 2, 3, 4, 5].sumNumbersOrStrings();
["Luke", "I'm", "your", "uncleeeee", "!"].sumNumbersOrStrings();
[1, "I'm", "your", "uncleeeee", "!"].sumNumbersOrStrings();