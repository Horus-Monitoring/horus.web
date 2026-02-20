/* ÍNICIO DO HEADER MOBILE */

class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".menu_responsivo",
  ".section_href",
  ".section_href li",
);
mobileNavbar.init();

/* FIM DO HEADER MOBILE */
/* ÍNICIO DO SLIDER  */

let atual = 0;
let slides = document.querySelectorAll(".slide");
let bolinhas = document.querySelectorAll(".bolinha");

function mostrarSlide() {
  slides.forEach(s => s.classList.remove("ativo"));
  bolinhas.forEach(b => b.classList.remove("ativa"));

  slides[atual].classList.add("ativo");
  bolinhas[atual].classList.add("ativa");
}

function irPara(index) {
  atual = index;
  mostrarSlide();
}

/* FIM DO SLIDER */