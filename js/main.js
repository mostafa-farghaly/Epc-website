// ===== Desktop hover dropdowns + safe collapse behavior =====
document.addEventListener('DOMContentLoaded', function () {
  const mq = window.matchMedia('(min-width: 992px)');
  const navCollapse = document.getElementById('navbarCollapse');

  // Keep collapse open when interacting inside dropdown menus (all sizes)
  document.querySelectorAll('#navbarCollapse .dropdown-menu').forEach(menu => {
    menu.addEventListener('click', e => e.stopPropagation());
  });

  // Collapse only on normal links (not dropdown toggles / items)
  document.querySelectorAll('#navbarCollapse .nav-link').forEach(link => {
    link.addEventListener('click', function () {
      const isDropdownToggle = this.classList.contains('dropdown-toggle');
      const inDropdownMenu  = !!this.closest('.dropdown-menu');
      if (isDropdownToggle || inDropdownMenu) return; // keep open while using dropdowns

      const inst = bootstrap.Collapse.getInstance(navCollapse) ||
                   new bootstrap.Collapse(navCollapse, { toggle: false });
      inst.hide();
    });
  });


  // ===== NAVBAR CORE (safe collapse + desktop hover via CSS + mobile fixes) =====
document.addEventListener('DOMContentLoaded', function () {
  const navCollapse = document.getElementById('navbarCollapse');
  const toggler = document.querySelector('.navbar-toggler');

  // 1) Measure real navbar height and store in --nav-h
  function setNavHeight(){
    const bar = document.querySelector('.navbar');
    if(!bar) return;
    const h = Math.ceil(bar.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--nav-h', h + 'px');
  }
  setNavHeight();
  window.addEventListener('load', setNavHeight);
  window.addEventListener('resize', setNavHeight);
  if (document.fonts && document.fonts.addEventListener) {
    document.fonts.addEventListener('loadingdone', setNavHeight);
  }

  // 2) Keep collapse open when clicking inside dropdown menus
  document.querySelectorAll('#navbarCollapse .dropdown-menu').forEach(menu => {
    menu.addEventListener('click', e => e.stopPropagation());
  });

  // 3) Only auto-close on normal links (not dropdown toggles/items)
  document.querySelectorAll('#navbarCollapse .nav-link').forEach(link => {
    link.addEventListener('click', function () {
      const isDropdownToggle = this.classList.contains('dropdown-toggle');
      const inDropdownMenu  = !!this.closest('.dropdown-menu');
      if (isDropdownToggle || inDropdownMenu) return; // keep open during dropdown use

      const inst = bootstrap.Collapse.getInstance(navCollapse) ||
                   new bootstrap.Collapse(navCollapse, { toggle: false });
      inst.hide();
    });
  });

  // 4) Safety net: if another script swallows the click, force toggle
  if (toggler && navCollapse) {
    toggler.addEventListener('click', function(){
      setTimeout(function(){
        const inst = bootstrap.Collapse.getInstance(navCollapse) ||
                     new bootstrap.Collapse(navCollapse, { toggle:false });
        navCollapse.classList.contains('show') ? inst.hide() : inst.show();
      }, 0);
    }, { passive:true });
  }
});




  document.addEventListener('DOMContentLoaded', function(){
    const btn = document.querySelector('.navbar-toggler');
    const target = document.getElementById('navbarCollapse');
    if (!btn || !target) return;
  
    btn.addEventListener('click', function(){
      // Let Bootstrap handle first; then ensure the state matches the click
      setTimeout(function(){
        const inst = bootstrap.Collapse.getInstance(target) ||
                     new bootstrap.Collapse(target, { toggle:false });
        // If still open -> close; if closed -> open
        target.classList.contains('show') ? inst.hide() : inst.show();
      }, 0);
    }, { passive:true });
  });
  

  (function(){
    function setNavHeight(){
      var bar = document.querySelector('.navbar');
      if(!bar) return;
      var h = Math.ceil(bar.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--nav-h', h + 'px');
    }
    window.addEventListener('load', setNavHeight);
    window.addEventListener('resize', setNavHeight);
    // in case fonts/icons load late
    document.fonts && document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', setNavHeight);
  })();
  

  

  // Hover behavior for desktop (>=992px)
  function bindHover() {
    document.querySelectorAll('.navbar .dropdown').forEach(dd => {
      if (dd.dataset.hoverBound === '1') return;
      dd.dataset.hoverBound = '1';

      const toggle = dd.querySelector('.dropdown-toggle');
      const bsDD   = new bootstrap.Dropdown(toggle, { autoClose: 'outside', popperConfig: { strategy: 'fixed' } });

      dd.addEventListener('mouseenter', () => { bsDD.show(); toggle.setAttribute('aria-expanded','true'); });
      dd.addEventListener('mouseleave', () => { bsDD.hide(); toggle.setAttribute('aria-expanded','false'); });

      // Prevent # jump when toggle is <a href="#">
      toggle.addEventListener('click', (e) => e.preventDefault());
    });
  }
  function unbindHover() {
    document.querySelectorAll('.navbar .dropdown').forEach(dd => {
      if (dd.dataset.hoverBound !== '1') return;
      dd.dataset.hoverBound = '0';
      const clone = dd.cloneNode(true);
      dd.parentNode.replaceChild(clone, dd);
    });
  }
  function onBreakpoint(e) { e.matches ? bindHover() : unbindHover(); }
  onBreakpoint(mq);
  mq.addEventListener('change', onBreakpoint);
});

(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').css('top', '0px');
    } else {
      $('.sticky-top').css('top', '-100px');
    }
  });

  // ❌ Removed jQuery hover dropdown block (conflicted with vanilla hover)

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>'
    ]
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0:   { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });

})(jQuery);

// ===== Swiper sliders (single init each) =====
const svcSwiper = new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 24,
  loop: true,
  navigation: { nextEl: '.services-next', prevEl: '.services-prev' },
  pagination: { el: '.services-dots', clickable: true },
  breakpoints: {
    0:    { slidesPerView: 1 },
    768:  { slidesPerView: 2 },
    1200: { slidesPerView: 3 }
  }
});

const clientsSwiper = new Swiper('.clients-swiper', {
  slidesPerView: 5,
  spaceBetween: 16,
  loop: true,
  autoplay: { delay: 2200, disableOnInteraction: false },
  navigation: { nextEl: '.clients-next', prevEl: '.clients-prev' },
  breakpoints: {
    0:   { slidesPerView: 2 },
    576: { slidesPerView: 3 },
    992: { slidesPerView: 5 }
  }
});

// ===== Smooth scroll (ignore dropdown toggles/items) =====
document.querySelectorAll('.navbar-nav .nav-link[href^="#"]:not(.dropdown-toggle)').forEach(link => {
  const href = link.getAttribute('href');
  if (href === '#' || href === '#0' || href === '#!') return;

  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      const yOffset = -70; // adjust if navbar height differs
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Close collapse on mobile after real navigation
    const navbarCollapse = document.getElementById('navbarCollapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const inst = bootstrap.Collapse.getInstance(navbarCollapse) ||
                   new bootstrap.Collapse(navbarCollapse, { toggle:false });
      inst.hide();
    }
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
const linkById = {};
navLinks.forEach(a => { linkById[a.getAttribute('href').slice(1)] = a; });

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = entry.target.id;
    const link = linkById[id];
    if(!link) return;
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.remove('active'));
      link.classList.add('active');
    }
  });
},{
  root: null,
  rootMargin: '-55% 0px -40% 0px',
  threshold: 0
});
sections.forEach(sec => observer.observe(sec));

// Active class on click (doesn't fight observer; observer will update on scroll)
document.addEventListener("DOMContentLoaded", function() {
  const navLinks2 = document.querySelectorAll('.navbar .nav-link');
  navLinks2.forEach(link => {
    link.addEventListener('click', function() {
      navLinks2.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// Accordion tweak (unchanged)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('#accordionExample .epc-acc-btn').forEach(function(btn){
    btn.addEventListener('click', function (e) {
      var sel = this.getAttribute('data-bs-target');
      if (!sel) return;
      var target = document.querySelector(sel);
      if (!target) return;

      if (target.classList.contains('show')) {
        e.preventDefault();
        var inst = bootstrap.Collapse.getOrCreateInstance(target, { toggle: false });
        inst.hide();
        this.classList.add('collapsed');
        this.setAttribute('aria-expanded', 'false');
      }
    });
  });
});


