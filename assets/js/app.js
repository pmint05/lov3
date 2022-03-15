const dropdownMenu = document.querySelector(".dropdown"),
	dropdownSelect = document.querySelector(".dropdown__select"),
	dropdownList = document.querySelector(".dropdown__list"),
	homeBtn = document.querySelector("#home__btn"),
	aboutBtn = document.querySelector("#about__btn"),
	feedbackBtn = document.querySelector("#feedback__btn"),
	createBtn = document.querySelector("#create__btn"),
	//Intro Image
	uploadButton = document.getElementById("upload__icon"),
	fileUploadHidden = document.querySelector("#intro__image"),
	previewName = document.querySelector("#intro__imageName"),
	previewImage = document.querySelector("#preview__introImage"),
	closePreview = document.querySelector("#closeImageBtn"),
	//End Image
	uploadButtonEnd = document.getElementById("upload__icon__end"),
	fileUploadHiddenEnd = document.querySelector("#end__image"),
	previewNameEnd = document.querySelector("#end__imageName"),
	previewImageEnd = document.querySelector("#preview__endImage"),
	closePreviewEnd = document.querySelector("#closeEndImageBtn"),
	//Modal
	showModalBtn = document.querySelector(".home__btn"),
	closeModalBtn = document.querySelector("#closePageBtn"),
	modal = document.querySelector(".creator"),
	loadingWrap = document.querySelector(".loading-wrap"),
	doneBtn = document.querySelector("#done-btn"),
	finalWrapper = document.querySelector(".final__wrapper"),
	finalCloseBtn = document.querySelector("#final__close"),
	doneLink = document.querySelector("doneLink"),
	finalPreview = document.querySelector("#final__preview"),
	nextBtn = document.querySelector(".next__btn"),
	backBtn = document.querySelector(".back__btn");

let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
let input = document.querySelectorAll("input[type=text]");
let textArea = document.querySelectorAll("textarea");
let file;
let fileEnd;
// const randomString = Math.random().toString(36).slice(2);
// const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').match;
nextBtn.onclick = () => {
	$("#feedback__content").addClass("show");
};
backBtn.onclick = () => {
	$("#feedback__content").removeClass("show");
};

input.forEach((input) => {
	input.onclick = () => {
		input.setSelectionRange(0, input.value.length);
	};
});
textArea.forEach((textArea) => {
	textArea.onclick = () => {
		textArea.setSelectionRange(0, textArea.value.length);
	};
});
let showModal = () => {
	if (!hasInit) {
		hasInit = true;
		realtimeDB
			.child("id")
			.get()
			.then((snapshot) => {
				id = snapshot.val();
			});
	}
	loadingWrap.classList.add("show");
	setTimeout(() => {
		loadingWrap.classList.remove("show");
		document.body.classList.add("lock");
	}, 1500);
	modal.classList.add("show");
	document.addEventListener("touchstart", handleTouchStart, false);
	document.addEventListener("touchmove", handleTouchMove, false);
};
showModalBtn.onclick = () => {
	showModal();
};
createBtn.onclick = () => {
	showModal();
	dropdownMenu.classList.remove("show");
	dropdownSelect.classList.remove("active");
};

closeModalBtn.onclick = () => {
	modal.classList.remove("show");
	document.body.classList.remove("lock");
};
uploadButtonEnd.onclick = () => {
	fileUploadHiddenEnd.click();
};
uploadButton.onclick = () => {
	fileUploadHidden.click();
};
fileUploadHidden.addEventListener("change", (e) => {
	file = e.target.files[0];
	if (isFileImage(file)) {
		if (file.size > 3000000) {
			alert("File is too large");
		} else {
			let fileName;
			if (file.name.length > 15) {
				var split = file.name.split(".");
				var tempFileName = split[0];
				var tempFileExt = split[1];
				fileName = tempFileName.substring(0, 15) + "..." + tempFileExt;
			} else {
				fileName = file.name;
			}
			previewImage.classList.add("active");
			previewImage.src = URL.createObjectURL(file);
			previewName.innerHTML = fileName;
			closePreview.classList.add("active");
		}
	} else {
		alert("Bạn chỉ được upload file hình ảnh!");
	}
});
fileUploadHiddenEnd.addEventListener("change", (e) => {
	fileEnd = e.target.files[0];
	if (isFileImage(fileEnd)) {
		if (fileEnd.size > 500000) {
			alert("File is too large");
		} else {
			let fileName;
			if (fileEnd.name.length > 15) {
				var split = fileEnd.name.split(".");
				var tempFileName = split[0];
				var tempFileExt = split[1];
				fileName = tempFileName.substring(0, 15) + "..." + tempFileExt;
			} else {
				fileName = fileEnd.name;
			}
			previewImageEnd.classList.add("active");
			previewImageEnd.src = URL.createObjectURL(fileEnd);
			previewNameEnd.innerHTML = fileName;
			closePreviewEnd.classList.add("active");
		}
	} else {
		alert("Bạn chỉ được upload file hình ảnh!");
	}
});
closePreview.onclick = () => {
	resetImg();
};
closePreviewEnd.onclick = () => {
	resetImgEnd();
};

let resetImg = () => {
	previewImage.classList.remove("active");
	previewImage.src = "";
	previewName.innerHTML = "Upload 1 chiếc ảnh cute ở đây";
	closePreview.classList.remove("active");
	fileUploadHidden.value = "";
};
let resetImgEnd = () => {
	previewImageEnd.classList.remove("active");
	previewImageEnd.src = "";
	previewNameEnd.innerHTML = "Upload 1 chiếc ảnh cute ở đây";
	closePreviewEnd.classList.remove("active");
	fileUploadHiddenEnd.value = "";
};
dropdownSelect.onclick = () => {
	document.body.classList.toggle("lock");
	dropdownMenu.classList.toggle("show");
	dropdownSelect.classList.toggle("active");
};
dropdownList.addEventListener("blur", () => {
	dropdownMenu.classList.remove("show");
});
homeBtn.onclick = () => {
	document.body.classList.toggle("lock");
	window.scroll({
		top: $("#home").offset().top,
		left: 0,
		behavior: "smooth",
	});
	dropdownMenu.classList.remove("show");
	dropdownSelect.classList.remove("active");
};
aboutBtn.onclick = () => {
	document.body.classList.toggle("lock");
	window.scroll({
		top: $("#about").offset().top,
		left: 0,
		behavior: "smooth",
	});
	dropdownMenu.classList.remove("show");
	dropdownSelect.classList.remove("active");
};
feedbackBtn.onclick = () => {
	document.body.classList.toggle("lock");
	window.scroll({
		top: $("#feedback").offset().top,
		left: 0,
		behavior: "smooth",
	});
	dropdownMenu.classList.remove("show");
	dropdownSelect.classList.remove("active");
};
$("#home").click(() => {
	reset();
});
$("#about").click(() => {
	reset();
});
$("#feedback").click(() => {
	reset();
});
let reset = () => {
	dropdownMenu.classList.remove("show");
	document.body.classList.remove("lock");
	dropdownSelect.classList.remove("active");
};
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides((slideIndex += n));
}

function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	// document.onkeydown = function (e) {
	// 	switch (e.keyCode) {
	// 		case 37:
	// 			if (n != 1) {
	// 				plusSlides(-1);
	// 			}
	// 			break;
	// 		case 39:
	// 			if (n != 4) {
	// 				plusSlides(1);
	// 			}
	// 			break;
	// 	}
	// };
	$("#creating__progress").css(
		"transform",
		"translateX(" + (-100 + (n - 1) * 25) + "%)"
	);
	if (n - 1 == 0) {
		document.querySelector(".prev").style.display = "none";
		document.querySelector(".next").style.display = "flex";
	} else if (n - 1 == 3) {
		document.querySelector(".next").style.display = "none";
		document.querySelector(".prev").style.display = "flex";
	} else {
		document.querySelector(".prev").style.display = "flex";
		document.querySelector(".next").style.display = "flex";
	}
	var i;
	var slides = document.getElementsByClassName("page");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "flex";
	dots[slideIndex - 1].className += " active";
}
if (document.documentElement.clientWidth <= 500) {
	document.getElementById("wall").setAttribute("src", "./assets/css/bgm.jpg");
}
let validate = () => {
	if (
		$("#big-header").val().trim() != "" &&
		$("#message").val().trim() != "" &&
		$("#end-text").val().trim() != "" &&
		$("#yes-inp").val().trim() != "" &&
		$("#no-inp").val().trim() != ""
	) {
		return true;
	}
	return false;
};

doneBtn.onclick = () => {
	if (validate()) {
		$("#button__text").text("Đang tạo...");
		doneBtn.classList.add("active");
		gotAllData();
	} else {
		alert("Bạn chưa điền đầy đủ thông tin!");
	}
};

let resetInput = () => {
	$("#intro__text").val("");
	$("#intro-btn").val("");
	$("#big-header").val("");
	$("#medium-header").val("");
	$("#yes-inp").val("");
	$("#no-inp").val("");
	$("#header-text").val("");
	$("#some-text").val("");
	$("#end-text").val("");
	file = fileEnd = null;
	resetImg();
	resetImgEnd();
	showSlides(5);
};
let done = (id) => {
	finalWrapper.classList.add("show");
	doneLink.innerHTML = "https://pmint05.github.io/lov3/u/?q=" + id;
	finalPreview.setAttribute(
		"href",
		"https://pmint05.github.io/lov3/u/?q=" + id
	);
	resetInput();
};
doneLink.onclick = () => {
	let tmpLink = doneLink.innerHTML;
	let tmpInput = document.createElement("input");
	tmpInput.setAttribute("type", "text");
	tmpInput.setAttribute("value", tmpLink);
	tmpInput.select() || tmpInput.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(tmpInput.value);
	$(".copied__notify").addClass("show");
	setTimeout(() => {
		$(".copied__notify").removeClass("show");
	}, 1500);
};
finalCloseBtn.onclick = () => {
	finalWrapper.classList.remove("show");
};
let uploadFile = (fileToUp, pos) => {
	return new Promise((resolve, reject) => {
		// Create the file metadata
		let metadata = {
			contentType: "image/jpeg",
		};
		// Upload file and metadata to the object 'images/mountains.jpg'
		let uploadTask = storageRef
			.child(id + "/" + pos + ".jpg")
			.put(fileToUp, metadata);
		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				// let progress =
				// 	(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// loading(progress, false);
			},
			(error) => {
				switch (error.code) {
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						alert("Bạn không có quyền truy cập máy chủ!");
						break;
					case "storage/canceled":
						alert("Đã hủy tải lên!");
						// User canceled the upload
						break;
					case "storage/unknown":
						alert("Tải lên thất bại, lỗi không xác định!");
						// Unknown error occurred, inspect error.serverResponse
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					resolve(downloadURL);
				});
			}
		);
	});
};
let gotAllData = async () => {
	let data = {
		intro__img: file ? await uploadFile(file, "intro") : "",
		end__img: fileEnd ? await uploadFile(fileEnd, "end") : "",
		intro__text: $("#intro__text").val() || "",
		intro__btn: $("#intro-btn").val() || "",
		big__header: $("#big-header").val(),
		medium__header: $("#medium-header").val() || "",
		yes__input: $("#yes-inp").val(),
		no__input: $("#no-inp").val(),
		header__text: $("#header-text").val() || "",
		some__text: $("#some-text").val() || "",
		end__text: $("#end-text").val(),
		message: $("#message").val(),
		time: getCrrDate(),
	};

	// console.log(data);
	db.collection("u").doc(`${id}`).set(data);
	// id += Math.floor(Math.random() * 15);
	doneBtn.classList.remove("active");
	$("#button__text").text("Done!");
	$("#creating__progress").css("transform", "translateX(0%)");
	setTimeout(() => {
		done(id);
		id = Math.random().toString(36).slice(2);
		realtimeDB.child("id").set(id);
		$("#button__text").text("Tạo ngay!");
	}, 500);
};
function isFileImage(file) {
	return file && file["type"].split("/")[0] === "image";
}
if (document.documentElement.clientWidth <= 500) {
	document.getElementById("wall").setAttribute("src", "./assets/css/bgm.jpg");
}
let xDown = null;
let yDown = null;

let getTouches = (evt) => {
	return (
		evt.touches || // browser API
		evt.originalEvent.touches
	); // jQuery
};

let handleTouchStart = (evt) => {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
};

let handleTouchMove = (evt) => {
	if (!xDown || !yDown) {
		return;
	}

	let xUp = evt.touches[0].clientX;
	let yUp = evt.touches[0].clientY;

	let xDiff = xDown - xUp;
	let yDiff = yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		/*most significant*/
		if (xDiff > 0) {
			/* right swipe */
			if (slideIndex - 1 != 3) {
				plusSlides(1);
			}
		} else {
			/* left swipe */
			if (slideIndex - 1 != 0) {
				plusSlides(-1);
			}
		}
	} else {
		if (yDiff > 0) {
			/* down swipe */
		} else {
			/* up swipe */
		}
	}
	/* reset values */
	xDown = null;
	yDown = null;
};
$("#star-1").change(() => {
	$(".status").text("Terrible");
	$(".active").removeClass("active");
	$(".terrible").addClass("active");
});
$("#star-2").change(() => {
	$(".status").text("Bad");
	$(".active").removeClass("active");
	$(".bad").addClass("active");
});
$("#star-3").change(() => {
	$(".status").text("Good");
	$(".active").removeClass("active");
	$(".good").addClass("active");
});
$("#star-4").change(() => {
	$(".status").text("Great");
	$(".active").removeClass("active");
	$(".great").addClass("active");
});
$("#star-5").change(() => {
	$(".status").text("Amazing");
	$(".active").removeClass("active");
	$(".amazing").addClass("active");
});
function resetForm(selector) {
	let form = document.querySelector(selector);
	if (form) {
		let inputs = form.querySelectorAll("[name][rules]");
		let textarea = form.querySelector("TEXTAREA");
		textarea.value = "";
		for (let input of inputs) {
			input.value = "";
			if (input.type === "checkbox") {
				input.checked = false;
			}
		}
	}
	$("#star-3").attr("checked", true);
	$(".status").text("Good");
	$(".active").removeClass("active");
	$(".good").addClass("active");
}
function submitData(data) {
	$("#feedback__done").addClass("show");
	setTimeout(() => {
		$("#feedback__done").removeClass("show");
	}, 1000);
	data = {
		...data,
		rate: $("input[type='radio']:checked").val(),
		time: getCrrDate(),
	};
	db.collection("feedBack").doc(`${fbId}`).set(data);
	realtimeDB.child("fbId").set(++fbId);
}
let getCrrDate = () => {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
    }
    if (hh < 10) {
        hh = "0" + hh;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    today = dd + "/" + mm + "/" + yyyy + " " + hh + ":" + min + ":" + sec;
	return today;
};

jQuery(function ($) {
	// MAD-RIPPLE // (jQ+CSS)
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
