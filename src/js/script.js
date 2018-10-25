
// Set index for actual active element in dom
function getIndexElement() {
	var allCarousels = document.querySelectorAll('div.js-carousel');
	for (var i = 0; i < allCarousels.length; i++){
		var elements = allCarousels[i].querySelector('.carousel-view').getElementsByTagName("div");
		var index = 0;
		for (var e = 0; e < elements.length; e++){
			if (elements[e].classList.contains('active')) {
				if (allCarousels[i].classList.contains('col-6')) {
					index = e / 2;
					break;
				} else {
					index = e;
					break;
				}
			} else {
				if (allCarousels[i].classList.contains('col-6')) {
					elements[e].style.marginLeft='calc(-50% - 5px)';
				} else {
					elements[e].style.marginLeft='-100%';
				}
			}
		}
		setCounter(elements, index);
	}
}

// Set sum of slides and active counted element
function setCounter(elements, index) {
	var counter = elements[0].parentElement.parentElement.parentElement.querySelector('.carousel-counter');
	if (elements[0].parentElement.parentElement.parentElement.classList.contains('col-6')) {
		counter.querySelector('.active-element').innerHTML = index + 1;
		counter.querySelector('.sum-elements').innerHTML = elements.length / 2;
	} else {
		counter.querySelector('.active-element').innerHTML = index + 1;
		counter.querySelector('.sum-elements').innerHTML = elements.length;
	}
}

// Load index function
window.onload = getIndexElement;

// Swipe one forward per margin-left and change class to next element
function nextSlide(event) {
	var elements = this.parentNode.parentNode.querySelector('.carousel-view').getElementsByTagName("div");
	for (var i = 0; i < elements.length; i++){
		if (elements[i].classList.contains('active')){
			if (i + 2 !== elements.length) {
				if (this.parentElement.parentElement.parentElement.classList.contains('col-6')) {
					elements[i].className = "carousel-element";
					elements[i + 2].className = "carousel-element active";
				} else {
					elements[i].className = "carousel-element";
					elements[i + 1].style.marginLeft = '0';
					elements[i + 1].className = "carousel-element active";
				}
				getIndexElement();
				break;
			} else {
				for (var e = 0; e < elements.length; e++){
					elements[0].className = "carousel-element active";
					elements[e].className = "carousel-element";
					elements[e].style.marginLeft = '0';
				}
				getIndexElement();
			}
		}
	}
}

// Swipe one backward per margin-left and change class to last element
function backSlide(event) {
	var elements = this.parentNode.parentNode.querySelector('.carousel-view').getElementsByTagName("div");
	for (var i = 0; i < elements.length; i++){
		if (elements[i].classList.contains('active')){
			if (i == 0) {
				elements[i].className = "carousel-element";
				if (this.parentElement.parentElement.parentElement.classList.contains('col-6')) {
					elements[elements.length - 2].style.marginLeft = '0';
					elements[elements.length - 2].className = "carousel-element active";
				} else {
					elements[elements.length - 1].style.marginLeft = '0';
					elements[elements.length - 1].className = "carousel-element active";
				}
				getIndexElement();
				break;
			} else {
				elements[i].style.marginLeft = '0';
				elements[i].className = "carousel-element";
				if (this.parentElement.parentElement.parentElement.classList.contains('col-6')) {
					elements[i - 2].style.marginLeft = '0';
					elements[i - 1].style.marginLeft = '0';
					elements[i - 2].className = "carousel-element active";
				} else {
					elements[i - 1].style.marginLeft = '0';
					elements[i - 1].className = "carousel-element active";
				}
				getIndexElement();
			}
		}
	}
}

// Find all elements with class carousel-next
var controlsNext = document.querySelectorAll('.carousel-next');
if (controlsNext) {
	controlsNext.forEach(function(el){
		el.addEventListener('click', function() {
			nextSlide.call(this, event);
		});
	});
}
// Find all elements with class carousel-back
var controlsBack = document.querySelectorAll('.carousel-back');
if (controlsBack) {
	controlsBack.forEach(function(el){
		el.addEventListener('click', function() {
			backSlide.call(this, event);
		});
	});
}

