let scene_template = {
	"seat 1": "#444451",
	"seat 2": "#444451",
	"seat 3": "#444451",
	"seat 4": "#444451",
	"seat 5": "#444451",
	"seat 6": "#444451",
	"seat 7": "#444451",
	"seat 8": "#444451",
	"seat 9": "#444451",
	"seat 10": "#444451",
	"seat 11": "#444451",
	"seat 12": "#444451",
	"seat 13": "#444451",
	"seat 14": "#444451",
	"seat 15": "#444451",
	"seat 16": "#444451",
	"seat 17": "#444451",
	"seat 18": "#444451",
	"seat 19": "#444451",
	"seat 20": "#444451",
	"seat 21": "#444451",
	"seat 22": "#444451",
	"seat 23": "#444451",
	"seat 24": "#444451",
	"seat 25": "#444451",
	"seat 26": "#444451",
	"seat 27": "#444451",
	"seat 28": "#444451",
	"seat 29": "#444451",
	"seat 30": "#444451",
	"seat 31": "#444451",
	"seat 32": "#444451",
	"seat 33": "#444451",
	"seat 34": "#444451",
	"seat 35": "#444451",
	"seat 36": "#444451",
	"seat 37": "#444451",
	"seat 38": "#444451",
	"seat 39": "#444451",
	"seat 40": "#444451",
	"seat 41": "#444451",
	"seat 42": "#444451",
	"seat 43": "#444451",
	"seat 44": "#444451",
	"seat 45": "#444451",
	"seat 46": "#444451",
	"seat 47": "#444451",
	"seat 48": "#444451",
};
let current_total;
let price;
let no_of_seats;
let currentmovie;

function show_Results(movie) {
	setupInitialValues(movie);
	Fetch(movie);
	setSeats();
	addEvents();
}

function check_For_Movie(string) {
	if (localStorage.getItem(string) == null) return false;
	return true;
}

function Fetch(movie) {
	if (check_For_Movie(movie) == true) {
		currentmovie = JSON.parse(localStorage.getItem(movie));
	} else {
		localStorage.setItem(movie, JSON.stringify(scene_template));
		currentmovie = JSON.parse(localStorage.getItem(movie));
	}
}

function setupInitialValues(movie) {
	price = getPrice(movie);
	current_total = 0;
	no_of_seats = 0;
	document.getElementById("total-container").innerHTML =
		"your total cost is " + current_total + "$ for " + no_of_seats + " seats";
}

function getPrice(pickedmovie) {
	return Number(
		pickedmovie.slice(pickedmovie.indexOf("$") + 1, pickedmovie.indexOf(")"))
	);
}

function setSeats() {
	let counter = 1;
	let rows = document.getElementById("seats-container").children;
	for (let i = 0; i < rows.length; i++) {
		let current_row = rows[i].children;
		for (let j = 0; j < current_row.length; j++) {
			let current_seat = current_row[j];
			if (currentmovie["seat " + counter] == "white") {
				current_seat.setAttribute("class", "whiteseat");
			} else {
				current_seat.setAttribute("class", "seat");
			}
			counter++;
		}
	}
}

function addEvents() {
	let rows = document.getElementById("seats-container").children;
	for (let i = 0; i < rows.length; i++) {
		let current_row = rows[i].children;
		for (let j = 0; j < current_row.length; j++) {
			let currentseat = current_row[j];
			add_single_event(currentseat);
		}
	}
	document
		.getElementById("confirm-button")
		.addEventListener("click", _Confirm_Button_Monitor, false);
	document
		.getElementById("reset-button")
		.addEventListener("click", Erase_Storage, false);
}

function add_single_event(theseat) {
	theseat.addEventListener("click", invert_colors, false);
}

function invert_colors() {
	let total = document.getElementById("total-container");
	if (this.className == "seat") {
		this.className = "cyanseat";
		current_total += price;
		no_of_seats++;
		total.innerHTML =
			"your total cost is " + current_total + "$ for " + no_of_seats + " seats";
	} else if (this.className == "cyanseat") {
		this.className = "seat";
		current_total -= price;
		no_of_seats--;
		total.innerHTML =
			"your total cost is " + current_total + "$ for " + no_of_seats + " seats";
	}
}

function _Confirm_Button_Monitor() {
	if (!_Reservation_Confirmation_()) location.reload();
	let rows = document.getElementById("seats-container").children;
	let counter = 1;
	for (let i = 0; i < rows.length; i++) {
		let current_row = rows[i].children;
		for (let j = 0; j < current_row.length; j++) {
			if (counter == 48) break;
			let seat = current_row[j];
			if (seat.className == "cyanseat") {
				currentmovie["seat " + counter] = "white";
			}
			counter++;
		}
	}
	Update_Storage();
	Update_Scene();
}

function _Reservation_Confirmation_() {
	return confirm(
		"are you sure you want " + no_of_seats + " for " + current_total + "$"
	);
}

function Update_Storage() {
	let moviename = document.getElementById("movie-selection-menu").value;
	localStorage.removeItem(moviename);
	localStorage.setItem(moviename, JSON.stringify(currentmovie));
}

function Erase_Storage() {
	if (!confirm("are you sure you want to erase the storage completely?")) {
		location.reload();
	}
	localStorage.clear();
	location.reload();
}

function Update_Scene() {
	let moviename = document.getElementById("movie-selection-menu").value;
	show_Results(moviename);
}

function Check_For_Selections() {
	let rows = document.getElementById("seats-container").children;
	for (let i = 0; i < rows.length; i++) {
		let current_row = rows[i].children;
		for (let j = 0; j < current_row.length; j++) {
			let seat = current_row[j];
			if (seat.className == "cyanseat") {
				return true;
			}
		}
	}
	return false;
}
