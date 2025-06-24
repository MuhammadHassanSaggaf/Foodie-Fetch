function showSidebar() {
	const sidebar = document.querySelector(".sidebar");
	sidebar.style.display = "flex";
}
function hideSidebar() {
	const sidebar = document.querySelector(".sidebar");
	sidebar.style.display = "none";
}

function showMore() {
	const buttons = document.querySelectorAll(".read-more");
	buttons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const container = btn.closest(".recipe-card");
			const more = container.querySelector(".show-more");
			const lessBtn = container.querySelector(".read-less");
			btn.style.display = "none";
			if (more) more.style.display = "flex";
			if (lessBtn) lessBtn.style.display = "flex";
		});
	});
}
showMore();

function showLess() {
	const buttons = document.querySelectorAll(".read-less");
	buttons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const container = btn.closest(".recipe-card");
			const more = container.querySelector(".show-more");
			const showbtn = container.querySelector(".read-more");
			btn.style.display = "none";
			if (more) more.style.display = "none";
			if (showbtn) showbtn.style.display = "flex";
		});
	});
}
showLess();
