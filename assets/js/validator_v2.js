let Validator = (formSelector, options) => {
	let formRules = {
		// name: "required",
		// email: "required|email",
		// password: "required|min:6",
	};

	let getParent = (element, selector) => {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement;
			}
			element = element.parentElement;
		}
	};

	let validatorRules = {
		required: (value) => {
			return value ? undefined : "This field is required";
		},
		email: (value) => {
			let regex =
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regex.test(value) ? undefined : "This must be an email";
		},
		min: (min) => {
			return (value) => {
				return value.length >= min
					? undefined
					: `Must be at least ${min} characters`;
			};
		},
		max: (max) => {
			return (value) => {
				return value.length <= max
					? undefined
					: `Must be at most ${max} characters`;
			};
		},

		match: (selector) => {
			let matchElement = formElement.querySelector(selector);
			return (value) => {
				return value === matchElement.value
					? undefined
					: "Passwords must match";
			};
		},
	};

	let formElement = document.querySelector(formSelector);
	let handleValidate = (event) => {
		let rules = formRules[event.target.name];
		let errorMessage;
		rules.find((rule) => {
			errorMessage = rule(event.target.value);
			return errorMessage;
		});
		if (errorMessage) {
			let formGroup = getParent(event.target, options.formGroupSelector);
			if (!formGroup) {
				return;
			}
			if (formGroup) {
				let formMessage = formGroup.querySelector(
					options.errorSelector
				);
				if (formMessage) {
					formMessage.innerText = errorMessage;
					formGroup.classList.add("invalid");
				}
			}
		}
		return !errorMessage;
	};
	let handleClearError = (event) => {
		let formGroup = getParent(event.target, options.formGroupSelector);
		if (formGroup.classList.contains("invalid")) {
			formGroup.classList.remove("invalid");
			let formMessage = formGroup.querySelector(options.errorSelector);
			if (formMessage) {
				formMessage.innerText = "";
			}
		}
	};
	if (formElement) {
		let inputs = formElement.querySelectorAll("[name][rules]");

		for (let input of inputs) {
			let rules = input.getAttribute("rules").split("|");
			for (let rule of rules) {
				let ruleInfo;
				let isRuleHasValue = rule.includes(":");

				if (isRuleHasValue) {
					ruleInfo = rule.split(":");
					rule = ruleInfo[0];
				}

				let ruleFunc = validatorRules[rule];

				if (isRuleHasValue) {
					ruleFunc = validatorRules[rule](ruleInfo[1]);
				}

				if (Array.isArray(formRules[input.name])) {
					formRules[input.name].push(ruleFunc);
				} else {
					formRules[input.name] = [ruleFunc];
				}
			}
			input.onblur = handleValidate;
			input.oninput = handleClearError;
		}
	}
	formElement.onsubmit = (e) => {
		e.preventDefault();
		let inputs = formElement.querySelectorAll("[name][rules]");
		let isValid = true;
		for (let input of inputs) {
			if (
				!handleValidate({
					target: input,
				})
			) {
				isValid = false;
			}
		}
		if (isValid) {
			if (typeof options.onsubmit === "function") {
				let enableInputs = formElement.querySelectorAll(
					"[name]:not([disabled])"
				);
				let formValues = Array.from(enableInputs).reduce(
					(values, input) => {
						switch (input.type) {
							case "radio":
								let radioElement = formElement.querySelector(
									'input[name="' + input.name + '"]:checked'
								);
								if (radioElement) {
									values[input.name] = radioElement.value;
								} else {
									values[input.name] = "";
								}
								break;
							case "checkbox":
								if (!input.matches(":checked")) {
									values[input.name] = [];
									return values;
								}
								if (!Array.isArray(values[input.name])) {
									values[input.name] = [];
								}
								values[input.name].push(input.value);
								break;
							case "file":
								values[input.name] = input.files;
								break;

							default:
								values[input.name] = input.value;
								break;
						}
						return values;
					},
					{}
				);
				options.onsubmit(formValues);
			} else {
				formElement.submit();
			}
		}
	};
};
/* 
Validator("#form-1", { --> form selector
        formGroupSelector: ".form-group", --> form group selector
        errorSelector: ".form-message", --> error selector
        onsubmit: (data) => { --> callback function
            console.log(data);
        }
    })
*/
