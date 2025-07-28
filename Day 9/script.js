// Form elements sbhi ek sath 
const form = document.getElementById("registrationForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const countryCode = document.getElementById("countryCode");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
const gender = document.getElementById("gender");
const city = document.getElementById("city");
const otherCityInput = document.getElementById("otherCityInput");
const terms = document.getElementById("terms");
const successPopup = document.getElementById("successPopup");
const strengthMsg = document.getElementById("strengthMsg");

// Show/hide password toggle 
togglePassword.addEventListener("click", () => {
    const type = password.type === "password" ? "text" : "password";
    password.type = type;
    togglePassword.textContent = type === "password" ? "See me" : "Hide";
});

// Show "Other city" input lene k liye
city.addEventListener("change", () => {
    if (city.value === "Other") {
        otherCityInput.style.display = "block";
        otherCityInput.required = true;
    } else {
        otherCityInput.style.display = "none";
        otherCityInput.required = false;
    }
});

// Password strength check krne k liye
password.addEventListener("input", () => {
    const val = password.value;
    let strength = "";

    if (val.length < 6) {
        strength = "Weak";
        strengthMsg.style.color = "red";
    } else if (val.match(/[A-Z]/) && val.match(/[0-9]/) && val.match(/[^A-Za-z0-9]/)) {
        strength = "Strong";
        strengthMsg.style.color = "green";
    } else {
        strength = "Medium";
        strengthMsg.style.color = "orange";
    }
    strengthMsg.textContent = "Password Strength: " + strength;
});

// Validation functions (IMP)
function showError(input, message) {
    const formGroup = input.closest(".form-group");
    const errorSpan = formGroup.querySelector(".error-message");
    input.classList.remove("success");
    input.classList.add("error");
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
    }
}

function showSuccess(input) {
    const formGroup = input.closest(".form-group");
    const errorSpan = formGroup.querySelector(".error-message");
    input.classList.remove("error");
    input.classList.add("success");
    if (errorSpan) {
        errorSpan.style.display = "none";
    }
}

function validateEmail(input) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!regex.test(input.value.trim())) {
        showError(input, "Invalid email format");
        return false;
    }
    showSuccess(input);
    return true;
}

function validatePhone(input) {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(input.value.trim())) {
        showError(input, "Phone must be 10 digits");
        return false;
    }
    showSuccess(input);
    return true;
}

function validatePassword(input) {
    const regex = /^[A-Z][A-Za-z0-9@#$%^&+=]{5,}$/; // At least 6 chars, starts with uppercase
    if (!regex.test(input.value)) {
        showError(input, "Password must start with uppercase & be 6+ chars");
        return false;
    }
    showSuccess(input);
    return true;
}

function validateConfirmPassword(pass, confirm) {
    if (pass.value !== confirm.value || confirm.value === "") {
        showError(confirm, "Passwords do not match");
        return false;
    }
    showSuccess(confirm);
    return true;
}

function validateName(input) {
    if (input.value.trim().length < 3) {
        showError(input, "Name must be at least 3 characters");
        return false;
    }
    showSuccess(input);
    return true;
}

function validateSelect(input) {
    if (input.value === "") {
        showError(input, "Please select an option");
        return false;
    }
    showSuccess(input);
    return true;
}

function validateCheckbox(input) {
    if (!input.checked) {
        showError(input, "You must agree to terms");
        return false;
    }
    showSuccess(input);
    return true;
}

// doieoednowdo
[fullName, email, phone, password, confirmPassword].forEach((input) => {
    input.addEventListener("blur", () => {
        switch (input.id) {
            case "fullName":
                validateName(input);
                break;
            case "email":
                validateEmail(input);
                break;
            case "phone":
                validatePhone(input);
                break;
            case "password":
                validatePassword(input);
                break;
            case "confirmPassword":
                validateConfirmPassword(password, confirmPassword);
                break;
        }
    });
});

// Form submission k wqt functioning
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isValid =
        validateName(fullName) &&
        validateEmail(email) &&
        validatePhone(phone) &&
        validatePassword(password) &&
        validateConfirmPassword(password, confirmPassword) &&
        validateSelect(gender) &&
        validateSelect(city) &&
        terms.checked;

    if (isValid) {
        // Final check: show popup and checkbox
        successPopup.classList.add("show");

        setTimeout(() => {
            successPopup.classList.remove("show");
            form.reset();
            strengthMsg.textContent = "";
            otherCityInput.style.display = "none";
            document.querySelectorAll("input, select").forEach((input) => {
                input.classList.remove("success", "error");
            });
        }, 3000);
    } else {
        // Show error if not accepted
        if (!terms.checked) {
            showError(terms, "You must agree to the terms");
        }
    }
});
