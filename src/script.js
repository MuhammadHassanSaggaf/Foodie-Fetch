function showSidebar() {
	document.querySelector(".sidebar").style.display = "flex";
}
function hideSidebar() {
	document.querySelector(".sidebar").style.display = "none";
}

// ——————————————————————————————
//  Favorites persistence in localStorage
// ——————————————————————————————
const favKey = "foodieFetchFavorites";
let favorites = new Set(JSON.parse(localStorage.getItem(favKey) || "[]"));
function saveFavorites() {
	localStorage.setItem(favKey, JSON.stringify(Array.from(favorites)));
}

// ——————————————————————————————
//  Comments persistence in localStorage
// ——————————————————————————————
const commentsKey = "foodieFetchComments";
let comments = JSON.parse(localStorage.getItem(commentsKey) || "{}");
function saveComments() {
	localStorage.setItem(commentsKey, JSON.stringify(comments));
}

// ——————————————————————————————
//  Fetch + render logic
// ——————————————————————————————
const API_URL = "https://json-foods.onrender.com/foods";
let allFoods = [];
const container = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
const searchIcon = document.querySelector(".search-icon i");

// 1) Fetch & initialize
async function init() {
	try {
		const res = await fetch(API_URL);
		if (!res.ok) throw new Error(res.statusText);
		allFoods = await res.json();
		renderRandom(3);
	} catch (err) {
		console.error("Failed to load foods:", err);
		container.innerHTML = "<p>Sorry, could not load recipes.</p>";
	}
}

// 2) Pick `count` random and render
function renderRandom(count) {
	if (!allFoods.length) return;
	const shuffled = shuffle(allFoods);
	renderCards(shuffled.slice(0, count));
}

// 3) Render a list of card‐objects into the DOM
function renderCards(list) {
	container.innerHTML = "";
	list.forEach((food) => {
		const {
			id,
			name,
			image,
			description,
			ingredients,
			instructions,
			nutrition,
		} = food;

		const card = document.createElement("div");
		card.className = "recipe-card";
		card.dataset.id = id;

		card.innerHTML = `
      <h2 class="recipe-title">${name}</h2>
      <img
        class="recipe-image"
        src="${image}"
        alt="${name}"
      />
      <p class="description">${description || ""}</p>
      <div class="button">
        <button class="read-more">Read More</button>
      </div>
      <div class="show-more" style="display:none">
        ${
					Array.isArray(ingredients) && ingredients.length
						? `<h3>Ingredients</h3>` +
						  ingredients.map((i) => `<p>${i}</p>`).join("")
						: ""
				}
        ${instructions ? `<h3>Instructions</h3><p>${instructions}</p>` : ""}
        ${
					nutrition
						? `<h3>Nutrition</h3>` +
						  Object.entries(nutrition)
								.map(([k, v]) => {
									const label = k[0].toUpperCase() + k.slice(1);
									return `<p>${label}: ${v}</p>`;
								})
								.join("")
						: ""
				}
        <div class="button read-less-container">
          <button class="read-less">Read Less</button>
        </div>
      </div>
      <div class="actions">
        <i class="heart fa-regular fa-heart"></i>
        <i class="edit fa-regular fa-comment-dots"></i>
      </div>
      <div class="comment-container"></div>
    `;

		// — toggle details
		const moreBtn = card.querySelector(".read-more");
		const lessBtn = card.querySelector(".read-less");
		const details = card.querySelector(".show-more");
		moreBtn.addEventListener("click", () => {
			moreBtn.style.display = "none";
			details.style.display = "block";
		});
		lessBtn.addEventListener("click", () => {
			details.style.display = "none";
			moreBtn.style.display = "";
		});

		// — favorite heart
		const heart = card.querySelector(".heart");
		if (favorites.has(id)) {
			heart.classList.replace("fa-regular", "fa-solid");
			heart.classList.add("favorited");
		}
		heart.addEventListener("click", () => {
			if (favorites.has(id)) {
				favorites.delete(id);
				heart.classList.replace("fa-solid", "fa-regular");
				heart.classList.remove("favorited");
			} else {
				favorites.add(id);
				heart.classList.replace("fa-regular", "fa-solid");
				heart.classList.add("favorited");
			}
			saveFavorites();
		});

		// — comment/edit icon + delete
		const commentContainer = card.querySelector(".comment-container");
		const editIcon = card.querySelector(".edit");

		// helper to render comment + delete button
		function renderComment() {
			commentContainer.innerHTML = "";
			if (comments[id]) {
				// show comment text
				const txt = document.createElement("span");
				txt.textContent = comments[id];
				// delete button
				const del = document.createElement("i");
				del.className = "delete-comment fa fa-trash";
				del.title = "Delete comment";
				del.addEventListener("click", () => {
					delete comments[id];
					saveComments();
					editIcon.classList.replace("fa-solid", "fa-regular");
					renderComment();
				});
				commentContainer.append(txt, del);
			}
		}

		// initial render of existing comment
		if (comments[id]) {
			editIcon.classList.replace("fa-regular", "fa-solid");
			renderComment();
		}

		editIcon.addEventListener("click", () => {
			const prev = comments[id] || "";
			const text = prompt("Your comment:", prev);
			if (text === null) return; // cancelled
			if (!text.trim()) {
				delete comments[id];
				editIcon.classList.replace("fa-solid", "fa-regular");
			} else {
				comments[id] = text.trim();
				editIcon.classList.replace("fa-regular", "fa-solid");
			}
			saveComments();
			renderComment();
		});

		container.appendChild(card);
	});
}

// 4) Search handler
function fetchData() {
	const term = searchInput.value.trim().toLowerCase();
	const filtered = term
		? allFoods.filter((f) =>
				(f.name + " " + (f.description || "")).toLowerCase().includes(term),
		  )
		: allFoods;
	renderCards(shuffle(filtered).slice(0, 3));
}

// 5) Utility: Fisher–Yates shuffle
function shuffle(arr) {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// hook up search icon
searchIcon.addEventListener("click", fetchData);

// kick off
document.addEventListener("DOMContentLoaded", init);

// ——————————————————————————————
//  Add new recipe handler
// ——————————————————————————————
const recipeForm = document.getElementById("recipeForm");

if (recipeForm) {
	recipeForm.addEventListener("submit", addRecipe);
}

async function addRecipe(evt) {
	evt.preventDefault();

	const titleInput = document.getElementById("recipeTitle");
	const imageInput = document.getElementById("recipeImage");
	const descriptionInput = document.getElementById("recipeDescription");
	const ingredientsInput = document.getElementById("recipeIngredients");
	const instructionsInput = document.getElementById("recipeInstructions");
	const nutritionInput = document.getElementById("recipeNutrition");

	const newFood = {
		name: titleInput.value.trim(),
		image: imageInput.value.trim(),
		description: descriptionInput.value.trim(),
		ingredients: ingredientsInput.value
			.split(/\r?\n|,\s*/)
			.map((i) => i.trim())
			.filter(Boolean),
		instructions: instructionsInput.value.trim(),
		nutrition: nutritionInput.value
			.split(/\r?\n/)
			.map((line) => line.split(":").map((s) => s.trim()))
			.filter(([k, v]) => k && v)
			.reduce((obj, [k, v]) => {
				const num = Number(v);
				obj[k.toLowerCase()] = isNaN(num) ? v : num;
				return obj;
			}, {}),
	};

	try {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newFood),
		});
		if (!res.ok) throw new Error(res.statusText);

		await init(); // re-fetch clean list from server (includes the new recipe)
		recipeForm.reset();
		alert("Recipe added successfully!");
	} catch (err) {
		console.error("Failed to add recipe:", err);
		alert("Sorry, could not add your recipe.");
	}
}

