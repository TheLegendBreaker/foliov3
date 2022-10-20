const playerData = {};
const lobopod = {
	hunger: 0,
	cuddle(){},
	dress(){},
	chat(){},
	feed() {
		let hunger = lobopod.hunger;
		if (hunger > 0) return lobopod.hunger--;
		console.log("your pet is full: ", lobopod.hunger);
	},
};
lobopod.hunger = 3;

document.addEventListener("keypress", function (event) {
	// F
	if (event.keyCode === 70) {
		lobopod.feed();
	}
});
