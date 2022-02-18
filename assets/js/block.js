function detectDevTool() {
	setTimeout(() => {
		if (
			window.innerWidth < window.outerWidth - 100 ||
			screen.availWidth < window.outerWidth - 100
		) {
			alert("F12???");
			location.reload();
		}
	}, 500);
}
window.oncontextmenu = function () {
	return false;
};
document.onkeydown = function (event) {
	if (event.keyCode == 123) {
		return false;
	} else if (
		(event.ctrlKey && event.shiftKey && event.keyCode == 73) ||
		(event.ctrlKey && event.shiftKey && event.keyCode == 67) ||
		(event.ctrlKey && event.shiftKey && event.keyCode == 74) ||
		(event.ctrlKey && event.keyCode == 85)
	) {
		return false;
	}
};

window.addEventListener("blur", detectDevTool);
