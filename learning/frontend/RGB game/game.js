numbers = 6;
var colors = generateColors(numbers);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor(colors);
var colorDisplay = document.querySelector("#display");
var message = document.querySelector('#message')
var h1 = document.querySelector("h1");
colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++){
	squares[i].style.background = colors[i];

	squares[i].addEventListener("click", function(){
		if (this.style.background === pickedColor){
			changeColor(pickedColor);
			message.textContent = "Correct";
			h1.style.background = pickedColor;
			resetBotton.textContent = "Play Again";
		} else{
			this.style.background = '#232323';
			message.textContent = "Try again";
		}
	})
}

function changeColor(color){
	for( var i = 0; i < squares.length; i++){
		squares[i].style.background = color;
	}
}

function pickColor(colors){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateColors(n){
	var arr = [];
	for (var i = 0; i < n; i++){
		arr.push(generateRGB());
	}
	return arr;
}

function generateRGB(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

var resetBotton = document.querySelector('#reset');
resetBotton.addEventListener("click", function(){
	colors = generateColors(numbers);
	pickedColor = pickColor(colors);
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++){
		squares[i].style.background = colors[i];
	}
	h1.style.background = 'steelblue';
	resetBotton.textContent = 'New Colors';
	message.textContent = '';
})

var easyB = document.querySelector("#easy");
var hardB = document.querySelector("#hard");

easyB.addEventListener("click", function(){
	hardB.classList.remove("selected");
	easyB.classList.add("selected");
	h1.style.background = 'steelblue';
	resetBotton.textContent = 'New Colors';
	numbers = 3;
	colors = generateColors(numbers);
	pickedColor = pickColor(colors);
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	message.textContent = '';
})

hardB.addEventListener("click", function(){
	easyB.classList.remove("selected");
	hardB.classList.add("selected");
	h1.style.background = 'steelblue';
	resetBotton.textContent = 'New Colors';
	numbers = 6;
	colors = generateColors(numbers);
	pickedColor = pickColor(colors);
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++){
		squares[i].style.background = colors[i];
		squares[i].style.display = "block";
	}
	message.textContent = '';
})