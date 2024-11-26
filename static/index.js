/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Nils Streedain
 * Email: streedan@oregonstate.edu
 */
var listOfPosts = document.querySelectorAll(".post");
var listOfCities = document.getElementById("filter-city").children;

// Toggle modal visibility and clear sell form
function toggleSellModal() {
	const elementsToToggle = ["sell-something-modal", "modal-backdrop"];
	elementsToToggle.forEach(e => document.getElementById(e).classList.toggle("hidden"));
	const inputsToClear = ["post-text-input", "post-photo-input", "post-price-input", "post-city-input"]
	inputsToClear.forEach(e => document.getElementById(e).value = "");
	document.getElementById("post-condition-new").checked = true;
}

// Create post with attributes from sell form. Add city to list if not added yet (warn if form not filled)
function createPost() {
	const description = document.getElementById("post-text-input").value;
	const photo = document.getElementById("post-photo-input").value;
	const price = document.getElementById("post-price-input").value;
	const city = document.getElementById("post-city-input").value;
	const condition = document.querySelector('input[name="post-condition"]:checked').value;
	
	if (!description || !photo || !price || !city || !condition) {
		alert("Please fill out all required fields.");
		return;
	}
		
	var post = Object.assign(document.createElement("div"), {className: "post"});
		post.dataset.price = price;
		post.dataset.city = city;
		post.dataset.condition = condition;
	
	var postContents = Object.assign(document.createElement("div"), {className: "post-conents"});
		post.appendChild(postContents);
	
	var postImageContainer = Object.assign(document.createElement("div"), {className: "post-image-container"});
		postContents.appendChild(postImageContainer);
	
	postImageContainer.appendChild(Object.assign(document.createElement("img"), {
		src: photo,
		alt: description
	}));
	
	var postInfoContainer = Object.assign(document.createElement("div"), {className: "post-info-container"});
		postContents.appendChild(postInfoContainer);
	
	postInfoContainer.appendChild(Object.assign(document.createElement("a"), {className: "post-title",
		href: "#",
		textContent: description
	}));
	
	postInfoContainer.appendChild(Object.assign(document.createElement("span"), {className: "post-price",
		textContent: price
	}));
	
	postInfoContainer.appendChild(Object.assign(document.createElement("span"), {className: "post-city",
		textContent: `(${city})`
	}));

	if (!Array.from(listOfCities).some(e => e.textContent == city))					// Add city to filter menu
		document.getElementById("filter-city").appendChild(Object.assign(document.createElement("option"), {textContent: city}));
	
	posts.appendChild(post);
	listOfPosts = document.querySelectorAll(".post");
	toggleSellModal();
}

// Filter posts based on filter attributes, items filtered out are removed from the DOM
function filterPosts() {
	const text = document.getElementById("filter-text").value;
	const priceMin = parseInt(document.getElementById("filter-min-price").value);
	const priceMax = parseInt(document.getElementById("filter-max-price").value);
	const city = document.getElementById("filter-city").value;
	const conditionList = Array.from(document.querySelectorAll('input[name="filter-condition"]:checked'));
	
	for (var i = 0; i < listOfPosts.length; i++) {
		var textBool = listOfPosts[i].querySelector("a").textContent.includes(text);
		var priceMinBool = (isNaN(priceMin) ? true : parseInt(listOfPosts[i].dataset.price) >= priceMin);
		var priceMaxBool = (isNaN(priceMax) ? true : parseInt(listOfPosts[i].dataset.price) <= priceMax);
		var cityBool = (city == "" ? true : listOfPosts[i].dataset.city.toLowerCase() == city.toLowerCase());
		var conditionBool = (conditionList.length == 0 ? true : conditionList.some(e => e.value == listOfPosts[i].dataset.condition));
		
		listOfPosts[i].remove();
		console.log(textBool, priceMinBool, priceMaxBool, cityBool, conditionBool)
		if (textBool && priceMinBool && priceMaxBool && cityBool && conditionBool)
			posts.appendChild(listOfPosts[i]);
	}
}

const toggleButtons = ["sell-something-button", "modal-close", "modal-cancel"]
toggleButtons.forEach(e => document.getElementById(e).addEventListener("click", toggleSellModal));
document.getElementById("modal-accept").addEventListener("click", createPost);
document.getElementById("filter-update-button").addEventListener("click", filterPosts);
