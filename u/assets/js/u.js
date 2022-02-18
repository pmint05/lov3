const okBtn = document.getElementById("ok-btn");
const header = document.querySelector("header");
const bg = document.getElementById("bg");
const yesBtn = document.querySelector(".yes-container");
const noBtn = document.querySelector(".no-container");
const msg = document.querySelector(".msg");
const overlay = document.querySelector("#overlay");
const log = document.querySelector(".log");
const sendBtn = document.querySelector("#send-btn");
const headerGif = document.querySelector("#header-gif");
const headerText = document.querySelector("#header-text");
const bigHeader = document.querySelector("#big-header");
const mediumHeader = document.querySelector("#medium-header");
const endWrapper = document.querySelector(".end");
const infoBtn = document.querySelector("#info-btn");
const infoWrap = document.querySelector(".info-wrap");
let tmpTxt;
document.addEventListener("DOMContentLoaded", () => {
	if (document.documentElement.clientWidth <= 500) {
		document
			.getElementById("wall")
			.setAttribute("src", "./assets/css/bgm.jpg");

		noBtn.addEventListener("click", () => {
			$("#no-btn").html("😜");
			noBtn.style.position = "absolute";
			noBtn.style.top =
				randomInt(5, window.innerHeight - noBtn.clientHeight) +
				50 +
				"px";
			noBtn.style.left =
				randomInt(5, window.innerWidth - noBtn.clientWidth) + 50 + "px";
			setTimeout(() => {
				$("#no-btn").html(tmpTxt);
			}, 1000);
		});
	}
	const urlSearchParams = new URLSearchParams(window.location.search);
	const req = Object.fromEntries(urlSearchParams.entries());
	console.log(req);
	if (isEmpty(req) || req.length > 1) {
		// window.location.href = "../index.html";
		window.location.href = "../";
	}
	const id = req.q;
	history.pushState(null, "", location.href.split("?")[0]);
	db.collection("u")
		.doc(`${id}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				gotData(doc.data());
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
				window.location.href = "../index.html";
			}
		})
		.catch((error) => {
			alert("Error getting document:", error);
			console.log("Error getting document:", error);
		});
});

let gifList = [
	"happy/achtung.gif",
	"happy/achtung2.gif",
	"happy/capoo1.gif",
	"happy/capoo2.gif",
	"happy/capoo3.gif",
	"happy/capoo5.gif",
	"happy/capoo6.gif",
	"happy/capoo7.gif",
	"happy/capoo8.gif",
	"kat/cat1.gif",
	// "bugcat.gif",
	// "achtung2.gif",
	// "bugcat4.gif",
];
let text;
let gifId = Math.floor(Math.random() * gifList.length);
headerGif.src = "./assets/image/" + gifList[gifId];
okBtn.addEventListener("click", () => {
	$(".btn-wrapper").removeClass("hide");
	overlay.classList.remove("show");
	$(".intro-wrap").addClass("hide");
});

noBtn.addEventListener("mouseenter", () => {
	$("#no-btn").html("😜");
	noBtn.style.position = "absolute";
	noBtn.style.top =
		randomInt(5, window.innerHeight - noBtn.clientHeight) + "px";
	noBtn.style.left =
		randomInt(5, window.innerWidth - noBtn.clientWidth) + "px";
	setTimeout(() => {
		$("#no-btn").html(tmpTxt);
	}, 750);
});

yesBtn.addEventListener("click", () => {
	msg.classList.add("show");
	overlay.classList.add("show");
});
$("#closeMsg").click(() => {
	msg.classList.remove("show");
	overlay.classList.remove("show");
});
let initTyping = () => {
	document.f.txt.setAttribute("maxlength", text.length);
};
let n = "";
let disabledInput = false;
let typing = () => {
	l = document.f.txt.value.length;
	if (l > 0) {
		for (var i = 0; i < l; i++) {
			n += text[i];
		}
	}
	document.f.txt.value = n;
	n = "";
	setTimeout(typing, 5);
};
sendBtn.addEventListener("click", Yeu);
function Yeu() {
	if (document.f.txt.value == "") {
		showLog("Chưa nhập gì kìa 😿");
	} else {
		// if (document.f.txt.value.length < 13) {
		// 	showLog("Nhập thêm chút nữa đi UwU");
		// } else {
		confirmed();
		// }
	}
}
infoBtn.addEventListener("click", () => {
	infoWrap.classList.toggle("show");
	if (infoWrap.classList.contains("show")) {
		infoBtn.innerHTML = "<i class='fad fa-times'></i>";
	} else {
		infoBtn.innerHTML = "<i class='fad fa-question-circle'></i>";
	}
});
let confirmed = () => {
	endWrapper.classList.add("show");
};

let isEmpty = (obj) => {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
};

let showLog = (message) => {
	if (!log.classList.contains("show")) {
		log.innerHTML = message;

		log.classList.add("show");
		setTimeout(() => {
			log.classList.remove("show");
		}, 1500);
	}
};
let randomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};
let loadingDone = (hasIntro) => {
	if (!hasIntro) {
		$("#overlay").removeClass("show");
	} else {
		$(".intro-wrap").removeClass("hide");
	}
	setTimeout(() => {
		$(".loading-wrap").addClass("done");
		$(".heart").on("animationend", () => {
			$(".loading-wrap").css({
				display: "none",
			});
			overlay.classList.remove("hide");
		});
		infoBtn.classList.add("show");
	}, 2000);
};
let gotData = (data) => {
	let hasIntro =
		data.img != "" || data.intro__text != "" || data.intro__button != "";
	bigHeader.textContent = data.big__header;
	mediumHeader.textContent = data.medium__header;
	$("#yes-btn").html(data.yes__input);
	$("#no-btn").html(data.no__input);
	tmpTxt = data.no__input;
	headerText.textContent = data.header__text;
	$(".msg h4").html(data.some__text);
	$("#end-text").html(data.end__text);
	$(".intro-wrap h1").html(data.intro__text);
	okBtn.textContent = data.intro__btn;
	text = data.message;
	document.title = data.big__header;

	initTyping();
	loadingDone(hasIntro);
	if (data.end__img) {
		$("#end-gif").attr("src", data.end__img);
	} else {
		$("#end-gif").attr(
			"src",
			"./assets/image/" +
				gifList[Math.floor(Math.random() * gifList.length)]
		);
	}
	if (data.intro__img) {
		$("#cute-img img").attr("src", data.intro__img);
	} else {
		$("#cute-img").css("display", "none");
	}
	if (data.medium__header == "") {
		$("#medium-header").css("display", "none");
	}
};
let submitForm = (e) => {
	e.preventDefault();
	return false;
};
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
