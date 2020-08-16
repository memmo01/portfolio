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

//string of code to display on the landing page for design
let code = ` let displaySkills = () => {
    let count = 0;
    let skillList = document.getElementById("dynamic-list");
    skillList.textContent = skills[count];
      setInterval(()=>
      {
      count++;
      if (count === skills.length)
        {
         count = 0;
        }
        skillList.textContent = skills[count];
        }, 2000);
      }
        LOADING Michael's SKILLS ....`;

//code display is a promise to complete dynamically adding characters to the page and when done move to the next function
const codeDisplay = () => {
  return new Promise((resolve, reject) => {
    let codeCharacters = code.split("");
    let count = 0;
    if (codeCharacters.length <= 0) {
      reject("The codeCharacters has no length");
    }
    let dynamicCodeInt = setInterval(() => {
      //check the length of the array. When then end has been reached, stop the setInterval and then return a resolved promise to run the displaySkills function
      if (count === codeCharacters.length - 1) {
        clearInterval(dynamicCodeInt);
        resolve("done");
      } else {
        let span = document.createElement("span");
        span.textContent = codeCharacters[count];
        dynamicCodeEl[0].appendChild(span);
        count++;
      }
    }, 10);
  });
};

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

// run codeDisplay and when it is done run the displaySkills function
codeDisplay()
  .then((res) => {
    setTimeout(() => {
      displaySkills();
    }, 1000);
  })
  .catch((err) => {
    console.error(err);
  });

//scroll responsive animation
window.addEventListener("scroll", function (e) {
  if (window.pageYOffset + 350 > portfolio.offsetTop) {
    runTextMovement("portfolio-right-movement", 0);
  }
  if (window.pageYOffset + 550 > portfolio2.offsetTop) {
    runTextMovement("portfolio-right-movement", 1);
  }
  if (window.pageYOffset + 1230 > portfolio3.offsetTop) {
    runTextMovement("portfolio-right-movement", 2);
  }
});

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
