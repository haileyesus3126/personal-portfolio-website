
'use strict';

// Keep the copyright year current.
document.getElementById('year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');


menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});


const themeButton = document.getElementById('theme-toggle');


function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  themeButton.textContent = theme === 'light' ? '☾' : '☀';
  themeButton.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
}


try { applyTheme(localStorage.getItem('portfolio-theme') || 'dark'); }
catch { applyTheme('dark'); }

themeButton.addEventListener('click', () => {
  const next = document.body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('portfolio-theme', next); } catch { /* storage may be disabled */ }
});


// Filter project cards by their data-category attribute.
const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let shown = 0;
  projectCards.forEach(card => {
    const visible = selected === 'all' || card.dataset.category === selected;
    card.classList.toggle('hidden', !visible);
    if (visible) shown++;
  });
  document.getElementById('no-results').classList.toggle('hidden', shown > 0);
}));


let shown = 0;
projectCards.forEach(card => {
  const visible = selected === 'all' || card.dataset.category === selected;
  card.classList.toggle('hidden', !visible);
  if (visible) shown++;
});
document.getElementById('no-results').classList.toggle('hidden', shown > 0);


// This is a static website. The contact form opens the visitor's email app;
// it does not send or store messages on a server.
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');
  if (!name || !email || !message || !contactForm.checkValidity()) {
    status.textContent = 'Please enter a valid name, email, and message.';
    return;
  }
  // Set your own public contact address here before publishing.
  const contactEmail = 'YOUR_EMAIL@example.com';
  if (contactEmail.startsWith('YOUR_')) {
    status.textContent = 'Site owner: update contactEmail in js/main.js before publishing.';
    return;
  }
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  status.textContent = 'Your email app should open. Please press Send there to deliver the message.';
});
