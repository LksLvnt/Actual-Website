const menuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for your message! This is a demo form.');
    contactForm.reset();
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
