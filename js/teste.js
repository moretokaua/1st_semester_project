 

document.addEventListener('DOMContentLoaded', () => {
    "use strict";
  
    // preloader
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          preloader.classList.add('loaded');
        }, 1000);
        setTimeout(() => {
          preloader.remove();
        }, 2000);
      });
    }
  
  
  
  
  
  
    /**
     * Mobile nav toggle
     */
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');
  
    document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
      el.addEventListener('click', function(event) {
        event.preventDefault();
        mobileNavToogle();
      })
    });
  
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavShow.classList.toggle('d-none');
      mobileNavHide.classList.toggle('d-none');
    }
  
    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navbar a').forEach(navbarlink => {
  
      if (!navbarlink.hash) return;
  
      let section = document.querySelector(navbarlink.hash);
      if (!section) return;
  
      navbarlink.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
  
    });
  
  
  
  
  
  
    // menu responsivo
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
  
    navDropdowns.forEach(el => {
      el.addEventListener('click', function(event) {
        if (document.querySelector('.mobile-nav-active')) {
          event.preventDefault();
          this.classList.toggle('active');
          this.nextElementSibling.classList.toggle('dropdown-active');
  
          let dropDownIndicator = this.querySelector('.dropdown-indicator');
          dropDownIndicator.classList.toggle('bi-chevron-up');
          dropDownIndicator.classList.toggle('bi-chevron-down');
        }
      })
    });
  
  
  
  
  
  
  
    // botão de scroll
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      const togglescrollTop = function() {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
      window.addEventListener('load', togglescrollTop);
      document.addEventListener('scroll', togglescrollTop);
      scrollTop.addEventListener('click', window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }));
    }
  
  
  
  
  
  
  
  
    // serve para exibir imagens e vídeos em um lightbox responsivo e bonito
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
  
  
  
  
  
  
  
    // animação de scroll
    function aos_init() {
      AOS.init({
        duration: 1500,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', () => {
      aos_init();
    });
  
  });









document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searching');
  const animeItems = document.querySelectorAll('.galleria-item');

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    console.log(`Search query: ${query}`); // Log para verificar a query

    animeItems.forEach(item => {
      const title = item.getAttribute('data-title');
      if (title) {
        const titleLower = title.toLowerCase();
        console.log(`Checking title: ${titleLower}`); // Log para verificar o título de cada item
        if (titleLower.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      } else {
        console.warn('Elemento sem atributo data-title:', item); // Log para identificar elementos sem data-title
      }
    });
  });

  // Exibe todos os itens inicialmente
  animeItems.forEach(item => {
    item.style.display = 'block';
  });
});