const okBtn = document.getElementById("ok-btn");
const header = document.querySelector("header");
const bg = document.getElementById("bg");
const yesBtn = document.querySelector(".yes-container");
const noBtn = document.querySelector(".no-container");
const msg = document.querySelector(".msg");
const overlay = document.querySelector("#overlay");
const log = document.querySelector(".log");
const sendBtn = document.querySelector("#send-btn");
const headerText = document.querySelector("#header-text");
const bigHeader = document.querySelector("#big-header");
const mediumHeader = document.querySelector("#medium-header");
const endWrapper = document.querySelector(".end");

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		$(".loading-wrap").addClass("done");
		$(".heart").on("animationend", () => {
			$(".loading-wrap").css({
				opacity: 0,
				visibility: "hidden",
			});
			overlay.classList.remove("hide");
		});
	}, 2000);
});
let text = "Không ép buộc gì cả, tớ yêu cậu nhất vũ trụ luôn ❤❤❤❤❤";
okBtn.addEventListener("click", () => {
	$(".btn-wrapper").removeClass("hide");
	overlay.classList.remove("show");
	$(".intro-wrap").addClass("hide");
});

noBtn.addEventListener("mouseenter", () => {
	noBtn.style.position = "absolute";
	noBtn.style.top =
		randomInt(5, window.innerHeight - noBtn.clientHeight) + "px";
	noBtn.style.left =
		randomInt(5, window.innerWidth - noBtn.clientWidth) + "px";
});
yesBtn.addEventListener("click", () => {
	msg.classList.add("show");
	overlay.classList.add("show");
});

document.f.txt.setAttribute("maxlength", text.length);
let n = "";
let disabledInput = false;
function typing() {
	l = document.f.txt.value.length;
	if (l > 0) {
		for (var i = 0; i < l; i++) {
			n += text[i];
		}
	}
	document.f.txt.value = n;
	n = "";
	setTimeout(typing, 5);
}
sendBtn.addEventListener("click", Yeu);
function Yeu() {
	if (document.f.txt.value == "") {
		showLog("Chưa nhập gì kìa 😿");
	} else {
		confirmed();
	}
}
function confirmed() {
	endWrapper.classList.add("show");
}

function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
if (document.documentElement.clientWidth <= 500) {
	document.getElementById("wall").setAttribute("src", "./assets/css/bgm.jpg");
}
function showLog(message) {
	if (!log.classList.contains("show")) {
		log.innerHTML = message;

		log.classList.add("show");
		setTimeout(() => {
			log.classList.remove("show");
		}, 1500);
	}
}
function randomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}
// RIPPLE
jQuery(function ($) {
	$(document).on("mousedown", "[data-ripple]", function (e) {
		var $self = $(this);

		if ($self.is(".btn-disabled")) {
			return;
		}
		if ($self.closest("[data-ripple]")) {
			e.stopPropagation();
		}

		var initPos = $self.css("position"),
			offs = $self.offset(),
			x = e.pageX - offs.left,
			y = e.pageY - offs.top,
			dia = Math.min(this.offsetHeight, this.offsetWidth, 100), // start diameter
			$ripple = $("<div/>", { class: "ripple", appendTo: $self });

		if (!initPos || initPos === "static") {
			$self.css({ position: "relative" });
		}

		$("<div/>", {
			class: "rippleWave",
			css: {
				background: $self.data("ripple"),
				width: dia,
				height: dia,
				left: x - dia / 2,
				top: y - dia / 2,
			},
			appendTo: $ripple,
			one: {
				animationend: function () {
					$ripple.remove();
				},
			},
		});
	});
});
