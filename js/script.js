let skills = ["JavaScript", "es6", "jQuery", "Nodejs", "React", "MySQL", "MongoDB", "HTML", "CSS"];
//slide menu variables
let navmenu = document.getElementById("hamburger");
let navmenuclose = document.getElementsByClassName("close");

//variable for getting html class to display dynamic code
let dynamicCodeEl = document.getElementsByClassName("dynamic-code");

//variables for the portfolio paragraphs to move on scroll
let portfolio = document.getElementById("port");
let portfolio2 = document.getElementById("port2");
let portfolio3 = document.getElementById("port3");




//adds list of skills dynamically to the page
const displaySkills = () => {
  //empty dynamic code div so only the dynamic skills populate
  dynamicCodeEl[0].innerHTML = "";
  dynamicCodeEl[0].classList.remove("dynamic-code");

  //count for what skill in the area is being iterated through
  let count = 0;
  let skillList = document.getElementById("dynamic-list");
  let proficientTxt = document.getElementById("proficient-text");

  //add proficient in to the html
  proficientTxt.textContent = "Proficient in: ";

  // add skill at key 0 in the skill array and then iterate through the array using setInterval
  skillList.textContent = skills[count];
  setInterval(() => {
    count++;
    if (count >= skills.length) {
      count = 0;
    }
    skillList.textContent = skills[count];
  }, 2000);
};
displaySkills()

//scroll responsive animation
if (screen.width > 768) {
  window.addEventListener("scroll", function () {

    if ((window.pageYOffset - 850) > portfolio.offsetTop) {
      runTextMovement("portfolio-right-movement", 0);
    }
    if ((window.pageYOffset - 900) > portfolio2.offsetTop) {
      runTextMovement("portfolio-right-movement", 1);
    }
    if ((window.pageYOffset - 1020) > portfolio3.offsetTop) {
      runTextMovement("portfolio-right-movement", 2);
    }
  });
}
function runTextMovement(location, index) {

  let move = document.getElementsByClassName(location);

  move[index].style.transform = "translateX(0%)";
}

// navmenu code
let linkList = document.getElementsByClassName("link-contain");
let closeBtn = document.getElementsByClassName("close");
// opening nav menu
navmenu.addEventListener("click", (e) => {
  e.preventDefault();
  changeBodyClass(true);
});

//closing navmenu
navmenuclose[0].addEventListener("click", function (e) {
  e.preventDefault();

  changeBodyClass(false);
});

//nav links clicked closes the nav menu and brings client to specific part of page
linkList[0].addEventListener("click", (e) => {
  // check to make sure screen is on mobile
  if (e.view.screen.width < 770) {
    if (e.target.matches("a") && e.target.className === "link-same-page") {
      changeBodyClass(false);
    }
  }
});

//determines whether the navmenu should be open or closed and body overflow be locked for scrolling or not
function changeBodyClass(add) {
  let nmenu = document.getElementsByClassName("nav-menu");
  nmenu[0].style.transition = "1s";

  if (add === true) {
    document.body.classList.add("active-nav-mobile");
    nmenu[0].classList.add("active-nav");
    //add fade in of close button
    closeBtn[0].classList.add("fade-in");
  } else if (add === false) {
    document.body.classList.remove("active-nav-mobile");
    nmenu[0].classList.remove("active-nav");
    //fade out close button
    closeBtn[0].classList.remove("fade-in");
  }
}

//Contact Form Submission
$("#contactForm").on("submit", function (event) {
  event.preventDefault();

  let data = {
    name: $("#formname").val(),
    email: $("#formemail").val(),
    message: $("#formmessage").val()
  };
  sendEmail(data);
});

function sendEmail(data) {
  $.ajax({
    url: "/api/sendemail",
    type: "POST",
    data: data
  }).done(function (data) {
    $("#formname").val(""), $("#formemail").val(""), $("#formmessage").val("");
    emailSuccess();
  });

  function emailSuccess() {
    $("#formSuccess").html("Email Sent Successfully!");
    setTimeout(function () {
      $("#formSuccess").css("display", "none");
    }, 5000);
  }
}
