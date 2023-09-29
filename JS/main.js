// settings box icone
{
  let setIcone = document.querySelector(".set-icon");
  let settingsBox = document.querySelector(".settings-box");
  setIcone.addEventListener("click", () => {
    settingsBox.classList.toggle("show");
    setIcone.classList.toggle("fa-spin");
  });
}

function handelActiveClass(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  ev.target.classList.add("active");
}

// switch colors
{
  let mainColor = localStorage.getItem("color_option");
  const colorsLi = document.querySelectorAll(".colors-list li");

  if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);

    document.querySelectorAll(".colors-list li").forEach((ele) => {
      ele.classList.remove("active");
      if (ele.dataset.color === mainColor) {
        ele.classList.add("active");
      }
    });
  }

  colorsLi.forEach((item) => {

    item.addEventListener("click", (e) => {

      handelActiveClass(e);

      // set color on root
      document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

      // set color in localStorage
      localStorage.setItem("color_option", e.target.dataset.color);
    });
  });
}

// Random Background option
{
  let backgroundOption = true;
  const randomBackground = document.querySelectorAll(".randome-backgrounds span");

  randomBackground.forEach((item) => {

    item.addEventListener("click", (e) => {

      handelActiveClass(e);
      if (e.target.dataset.background === "yes") {
        backgroundOption = true;
        console.log(backgroundOption);
        randomezImages();
      } else {
        backgroundOption = false;
        console.log(backgroundOption);
        randomezImages();
      }
    });
  });

  // landing page
  // backgrounds option

  let backgroundInterval;

  function randomezImages() {
    if (backgroundOption === true) {
      let landingPage = document.querySelector(".landing-page");
      let imgeArray = [ "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg" ];
      backgroundInterval = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * imgeArray.length);
        landingPage.style.backgroundImage = `url(imgs/${ imgeArray[ randomNumber ] })`;
      }, 8000);
    } else {
      clearInterval(backgroundInterval);
    }
  }

  randomezImages();
}

// select skills selectore
{
  let ourSkills = document.querySelector(".skills");

  window.onscroll = function () {
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    // skills Outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window Height
    let windowHeight = this.innerHeight;
    // window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
      // get all spans
      let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

      allSkills.forEach((item) => {
        item.style.width = item.dataset.progress;
      });

    }
  };
}

// create popup with the image
{
  let ourGallary = document.querySelectorAll(".images-box img");

  ourGallary.forEach((item) => {
    item.addEventListener("click", (e) => {

      let overlay = document.createElement("div");
      overlay.className = "popup-overlay";
      document.body.appendChild(overlay);

      let popupBox = document.createElement("div");
      popupBox.className = "popup-box";

      if (item.alt !== null) {
        let imgHeading = document.createElement("h2");
        // create Text for heading
        let imgText = document.createTextNode(item.alt);
        imgHeading.appendChild(imgText);
        popupBox.appendChild(imgHeading);
      }

      let popupImage = document.createElement("img");
      popupImage.src = item.src;
      popupBox.appendChild(popupImage);

      document.body.appendChild(popupBox);

      // create close span
      let closeButton = document.createElement("span");
      let closeButtonText = document.createTextNode("X");
      closeButton.appendChild(closeButtonText);
      closeButton.className = "close-button";
      popupBox.appendChild(closeButton);
    });
  });

  // Close popup 
  document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
      // Remove the current popup
      e.target.parentNode.remove();
      // remove overlay
      document.querySelector(".popup-overlay").remove();
    }
  });
}

// nav bullets
{
  // select all bullets
  const allBullets = document.querySelectorAll(".nav-bullets .bullte");
  allBullets.forEach((item) => {
    item.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // bullets option
  let bulletsSpans = document.querySelectorAll(".bullets-option span");
  let bulletsConainer = document.querySelector(".nav-bullets");

  // bullets localStorage
  let bulletsLocalItem = localStorage.getItem("bullets_option");
  if (bulletsLocalItem !== null) {
    bulletsSpans.forEach((item) => {
      item.classList.remove("active");
    });

    if (bulletsLocalItem === "block") {
      bulletsConainer.style.display = "block";
      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      bulletsConainer.style.display = "none";
      document.querySelector(".bullets-option .no").classList.add("active");
    }
  }

  bulletsSpans.forEach((item) => {
    item.addEventListener("click", (e) => {
      handelActiveClass(e);
      if (e.target.dataset.display === "show") {
        bulletsConainer.style.display = "block";
        localStorage.setItem("bullets_option", "block");
      } else {
        bulletsConainer.style.display = "none";
        localStorage.setItem("bullets_option", "none");
      }
    });
  });
}

// reset button
{
  document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();
    window.location.reload();
  };
}

// menu 
{
  const menuIcon = document.querySelector(".header-area i");
  const linksUl = document.querySelector(".header-area .links");
  const linksUlLi = document.querySelectorAll(".header-area .links li");
  menuIcon.addEventListener("click", (e) => {
    linksUl.classList.toggle("show-menu");

  });
}