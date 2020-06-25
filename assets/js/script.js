let skills = ["javasript", "es6", "jQuery", "HTML", "CSS"];
let navmenu = document.getElementById("hamburger");
let navmenuclose = document.getElementById("close");
let dynamicCodeEl = document.getElementsByClassName("dynamic-code");
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

// navmenu code

// opening nav menu
navmenu.addEventListener("click", function (e) {
  e.preventDefault();
  let nmenu = document.getElementsByClassName("nav-menu");
  nmenu[0].style.width = "430px";
});

//closing navmenu
navmenuclose.addEventListener("click", function (e) {
  e.preventDefault();
  let nmenu = document.getElementsByClassName("nav-menu");
  nmenu[0].style.width = "0px";
});
