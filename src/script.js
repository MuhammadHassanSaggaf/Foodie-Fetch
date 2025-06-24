function showSidebar() {
	const sidebar = document.querySelector(".sidebar");
	sidebar.style.display = "flex";
}
function hideSidebar() {
	const sidebar = document.querySelector(".sidebar");
	sidebar.style.display = "none";
}


function showMore() {
	const showbutton = document.querySelector(".button");
	if (showbutton) {
		showbutton.style.display = "none";
	}

	const showDetails = document.querySelector(".show-more");
	if (showDetails) {
		showDetails.style.display = "flex";
	}

	const lessButton = document.querySelector(".read-less-container");
	if (lessButton) {
		lessButton.style.display = "flex";
		// Remove this line to prevent .show-more from being hidden immediately
		// showDetails.style.display = 'none';
	}
}

function showLess() {
  const showbutton = document.querySelector(".button");
	if (showbutton) {
		showbutton.style.display = "flex";
	}

	const showDetails = document.querySelector(".show-more");
	if (showDetails) {
		showDetails.style.display = "none";
	}

	const lessButton = document.querySelector(".read-less-container");
	if (lessButton) {
		lessButton.style.display = "none";
		// Remove this line to prevent .show-more from being hidden immediately
		// showDetails.style.display = 'none';
	}
}