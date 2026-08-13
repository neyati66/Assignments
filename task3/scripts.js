const name = document.getElementById("name");
const nameError = document.getElementById("nameerror");

const email = document.getElementById("email");
const emailError = document.getElementById("emailerror");

const course = document.getElementById("course");
const courseError = document.getElementById("courseerror");

const feedback = document.getElementById("feedback");
const feedbackError = document.getElementById("feedbackerror");

const feedbackForm = document.getElementById("feedbackform");

const storedContent = document.getElementById("storedcontent");
const sessionUser = document.getElementById("sessionUser");
const deleteBtn = document.getElementById("delete");

name.addEventListener("input", function () {

    if (name.value.trim().length >= 3) {
        nameError.textContent = "";
    }

});

email.addEventListener("input", function () {

    if (email.value.includes("@")) {
        emailError.textContent = "";
    }

});

course.addEventListener("change", function () {

    if (course.value != "") {
        courseError.textContent = "";
    }

});

feedback.addEventListener("input", function () {

    if (feedback.value.trim() != "") {
        feedbackError.textContent = "";
    }

});

feedbackForm.addEventListener("submit", function (event) {

    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    courseError.textContent = "";
    feedbackError.textContent = "";

    let isValid = true;

    if (name.value.trim() === "") {

        nameError.textContent = "Name is required";
        isValid = false;

    }

    else if (name.value.trim().length < 3) {

        nameError.textContent = "Name must contain at least 3 characters";
        isValid = false;

    }

    if (email.value.trim() === "") {

        emailError.textContent = "Email is required";
        isValid = false;

    }

    else if (!email.value.includes("@")) {

        emailError.textContent = "Enter a valid Email";
        isValid = false;

    }

    if (course.value === "") {

        courseError.textContent = "Please select a course";
        isValid = false;

    }

    if (feedback.value.trim() === "") {

        feedbackError.textContent = "Please enter feedback";
        isValid = false;

    }

    if (isValid) {

        saveLocal();
        saveSession();
        showData();

        feedbackForm.reset();

    }

});

function saveLocal() {

    localStorage.setItem("name", name.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("course", course.value);
    localStorage.setItem("feedback", feedback.value);

}

function saveSession() {

    sessionStorage.setItem("currentUser", name.value);

}

function showData() {

    const studentName = localStorage.getItem("name");
    const studentEmail = localStorage.getItem("email");
    const studentCourse = localStorage.getItem("course");
    const studentFeedback = localStorage.getItem("feedback");

    const currentUser = sessionStorage.getItem("currentUser");

    if (studentName != null) {

        storedContent.innerHTML =
            "<b>Name :</b> " + studentName + "<br><br>" +
            "<b>Email :</b> " + studentEmail + "<br><br>" +
            "<b>Course :</b> " + studentCourse + "<br><br>" +
            "<b>Feedback :</b> " + studentFeedback;

    }

    else {

        storedContent.innerHTML = "No feedback stored.";

    }

    if (currentUser != null) {

        sessionUser.innerHTML =
            "Current Session User : " + currentUser;

    }

    else {

        sessionUser.innerHTML = "";

    }

}

deleteBtn.addEventListener("click", function () {

    removeLocal();
    removeSession();
    showData();

});

function removeLocal() {

    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("course");
    localStorage.removeItem("feedback");

}

function removeSession() {

    sessionStorage.removeItem("currentUser");

}

showData();