let meniu = document.getElementById("mobile-meniu-body");
let x_mark = document.getElementById("x-mark");
let hamburger = document.getElementById("open-mark");
console.log(meniu);

function openMeniu() {
  meniu.classList.toggle("open");
  x_mark.style.display = "block";
  hamburger.style.display = "none";
}
function closeMeniu() {
  meniu.classList.remove("open");
  x_mark.style.display = "none";
  hamburger.style.display = "block";
}
function checkScreenWidth() {
  if (window.innerWidth > 1200) {
    // TITLU
    const containere = document.querySelectorAll(".child");

    containere.forEach((container) => {
      container.addEventListener("mouseenter", function () {
        this.querySelector(".titlu3").style.bottom = "30px";
        this.querySelector(".titlu3").style.opacity = "1";
      });

      container.addEventListener("mouseleave", function () {
        this.querySelector(".titlu3").style.bottom = "300px";
        this.querySelector(".titlu3").style.opacity = "0";
      });
    });
  }
}
checkScreenWidth();
window.addEventListener("resize", checkScreenWidth);

// SLIDER
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtn = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutID;

//Get the number of cards that can fit in the carousel at once
let cardPerViev = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to begining of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerViev)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the last few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerViev).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

//Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  //records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeoutID = setTimeout(() => {
    (carousel.scrollLeft += firstCardWidth), 2500;
  });
};
autoPlay();

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearInterval(timeoutID);
  if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutID));
wrapper.addEventListener("mouseleave", autoPlay);

function submitForm() {
  document.getElementById("myForm").submit();
}
