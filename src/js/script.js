// HEADER

const hero = document.querySelector('.hero');
let headerLinks = document.querySelectorAll('.header__menu-link');
const header = document.querySelector('.header');
const burger = document.querySelector('.burger__btn');
const headerMenu = document.querySelector('.header__menu');
const headerStartTop = 53;
const headerHeight = 54;


headerLinks = Array.from(headerLinks);
headerLinks[0].classList.add('hover-link', 'active-link');

headerLinks.forEach((headerLink, index) => {

  headerLink.addEventListener('mouseover', (event) => {

    headerLinks.forEach(headerLink => {
      headerLink.classList.remove('hover-link');
    });
    headerLinks[index].classList.add('hover-link');
    headerLink.addEventListener('click', (e) => {

      e.preventDefault();
      headerLinks.forEach(headerLink => {
        headerLink.classList.remove('active-link');
      });
      if (burger.classList.contains('active')) {
        burger.classList.remove('active');
        closeBurgerMenu();
      }
      const sectionID = headerLink.getAttribute('href');
      const scrollTarget = document.querySelector(sectionID);
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
      headerLinks[index].classList.add('active-link', 'hover-link');
    });
  });
  headerLink.addEventListener('mouseout', (event) => {
    headerLinks.forEach(headerLink => {
      headerLink.classList.remove('hover-link');
      if (headerLink.classList.contains('active-link')) {
        headerLink.classList.add('hover-link');
      }
    });
  });
});

window.addEventListener('scroll', event => {
  let fromTop = window.scrollY;
  if (fromTop > headerStartTop) {
    header.classList.add('header-on-scroll');
    header.classList.remove('header-on-start');
  }
  else {
    header.classList.remove('header-on-scroll');
    if (!header.classList.contains('header-on-start')) { header.classList.add('header-on-start'); }
  }
  headerLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    if (
      (section.offsetTop) <= (fromTop + 55) &&
      (section.offsetTop) + section.offsetHeight > (fromTop)
    ) {
      link.classList.add('active-link', 'hover-link');
    } else {
      link.classList.remove('active-link', 'hover-link');
    }
  });
});
function closeBurgerMenu() {
  headerMenu.style.left = '-100px';
  header.classList.remove('header-big');
  header.classList.add('header-small');
  let fromTop = window.scrollY;
  if (fromTop <= headerStartTop) {
    header.classList.remove('header-on-scroll');
    header.classList.add('header-on-start');
  }
}

function openBurgerMenu() {
  headerMenu.style.left = '25px';
  header.classList.remove('header-small');
  header.classList.add('header-big');
}

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  if (burger.classList.contains('active')) {
    openBurgerMenu();
  }
  else {
    closeBurgerMenu();
  }
});


// SLIDERS

const heroSlider = new Swiper('.hero__slider', {
  loop: true,
  direction: "vertical",
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.hero__pagination',
  },
  navigation: {
    nextEl: '.hero__slider-next',
  },
  slidesPerView: 1,
  spaceBetween: 5,
});
if (window.innerWidth <= '768') {
  heroSlider.disable();
  document.querySelector('.hero__slider-next').style.display = 'none';
}

const newsSlider = new Swiper('.news__slider', {
  loop: true,

  pagination: {
    el: '.news__pagination',
  },

  navigation: {
    nextEl: '.news__slider-left',
    prevEl: '.news__slider-right',
  },

  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {

    320: {
      slidesPerView: 1,
    },
    424: {
      slidesPerView: 1,
    },
    525: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
  },
});

const swiperPrev = document.querySelector('.news__slider-left');
const swiperNext = document.querySelector('.news__slider-right');

swiperPrev.addEventListener('click', () => {
  newsSlider.slidePrev();
});
swiperNext.addEventListener('click', () => {
  newsSlider.slideNext();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > '768') {
    closeBurgerMenu();
    burger.classList.remove('active');
    heroSlider.enable();
    document.querySelector('.hero__slider-next').style.display = 'block';
  } else {
    heroSlider.disable();
    document.querySelector('.hero__slider-next').style.display = 'none';
  }
});

// FORM
const contactForm = document.querySelector('.contact__form');
const ename = contactForm.querySelector('.form__input-name');
const email = contactForm.querySelector('.form__input-email');
const formBtn = document.querySelector('.form__btn');

function error(message, element) {
  element.style.borderColor = 'red';
  let errorEl = document.createElement('span');
  errorEl.className = "error";
  errorEl.style.color = 'red';
  errorEl.innerText = 'Enter your ' + message + ', please';
  element.after(errorEl);
  errorEl.style.position = 'absolute';
  errorEl.style.bottom = '-20px';
  errorEl.style.left = '0';
}

function clear() {
  this.style.borderColor = '#737171';
  if (this.nextSibling && this.nextSibling.className == 'error') {
    this.nextSibling.remove();
  }
}

function checkEmail() {
  let result = ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value);
  if (!email.value || result) {
    error('e-mail', email); return false;
  } else return true;
}

function checkName() {
  let result = !/^[a-zA-Z_-]+( [a-zA-Z_-]+)*|[а-яА-Я_-]+( [а-яА-Я_-]+)*$/.test(ename.value);
  if (!ename.value || result) {
    error('name', ename); return false;
  } else return true;
}

ename.addEventListener('focusout', checkName);
ename.addEventListener('focusin', clear);
email.addEventListener('focusout', checkEmail);
email.addEventListener('focusin', clear);
formBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clear.call(ename);
  clear.call(email);
  if (checkName() && checkEmail()) {
    localStorage.setItem('name', ename.value);
    localStorage.setItem('email', email.value);
    ename.value = '';
    email.value = '';
    formBtn.value = 'thanks';
    setTimeout(() => { formBtn.value = 'Submit'; }, 2000);
  }
});

// GALLERY
Fancybox.bind('[data-fancybox="gallery"]', {
  caption: function (fancybox, carousel, slide) {
    return (
      `${slide.index + 1} / ${carousel.slides.length} <br />` + slide.caption
    );
  },
});

//  MAP
function initMap() {
  const uluru = { lat: 29.649754739290838, lng: - 98.4587735746922 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru,
    disableDefaultUI: true,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ],
  });

  const svgMarker = {
    path: "M61 53C61 57.4183 57.4183 61 53 61C48.5817 61 45 57.4183 45 53C45 48.5817 48.5817 45 53 45C57.4183 45 61 48.5817 61 53Z",
    fillColor: '#7E5AFF',
    fillOpacity: 1,
    strokeWeight: 33,
    strokeOpacity: 0.9,
    strokeColor: '#fff',
    scale: 3,
    anchor: new google.maps.Point(45, 70),
  };

  const marker = new google.maps.Marker({
    position: uluru,
    icon: svgMarker,
    map: map,
  });
}

window.initMap = initMap;


