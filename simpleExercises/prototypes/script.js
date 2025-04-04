String.prototype.sheldonize = function(counter) {
	return `knock knock ${this} `.repeat(counter);
};

const batata = "batatas";
console.log(batata.sheldonize(2));



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

Array.prototype.checkRepeated = function(element) {
  let counter = 0;
  this.forEach((e) =>{
    if(e === element){
      counter ++;
    }
  });
  return counter;
}
//funcao que passa um argumento que vai ser o argumento a ver se esta repetido
let arr = [1,2,3,4,4,5,6,6,7]
console.log(arr.checkRepeated(6));

[1, 2, 3, 4, 5].sumNumbersOrStrings();
["Luke", "I'm", "your", "uncleeeee", "!"].sumNumbersOrStrings();
[1, "I'm", "your", "uncleeeee", "!"].sumNumbersOrStrings();

Array.prototype.sumNumberOrStrings = function () {
  console.log(this);
};

[1,2].sumNumberOrStrings();