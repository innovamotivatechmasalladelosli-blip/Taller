const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const bookingModal = document.querySelector('#booking-modal');
const bookingForm = document.querySelector('#booking-form');
const bookingDemo = document.querySelector('#booking-demo');
const bookingLoading = document.querySelector('.booking-loading');
const bookingSuccess = document.querySelector('.booking-success');
const bookingSummary = document.querySelector('#booking-summary');
const whatsappLink = document.querySelector('#whatsapp-link');
const assistant = document.querySelector('#assistant');
const assistantToggle = document.querySelector('#assistant-toggle');
const assistantMessages = document.querySelector('#assistant-messages');

const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const setMenu = (open) => {
  mainNav?.classList.toggle('is-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
menuToggle?.addEventListener('click', () => setMenu(!mainNav.classList.contains('is-open')));
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

const resetBooking = () => {
  bookingDemo?.reset();
  bookingDemo?.querySelector('[name="time"]')?.setAttribute('value', '08:30');
  bookingDemo?.querySelectorAll('.slot').forEach((slot, index) => slot.classList.toggle('is-selected', index === 0));
  bookingLoading?.classList.remove('is-visible');
  bookingSuccess?.classList.remove('is-visible');
  bookingDemo?.classList.remove('is-hidden');
};
const openBooking = () => {
  resetBooking();
  bookingModal?.classList.add('is-open');
  bookingModal?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  window.setTimeout(() => bookingModal?.querySelector('input')?.focus(), 120);
};
const closeBooking = () => {
  bookingModal?.classList.remove('is-open');
  bookingModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('a[href="#agenda"]').forEach((link) => {
  link.addEventListener('click', (event) => { event.preventDefault(); openBooking(); });
});
document.querySelectorAll('[data-close-booking]').forEach((element) => element.addEventListener('click', closeBooking));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeBooking(); setMenu(false); assistant?.classList.remove('is-open'); }
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  openBooking();
  const values = new FormData(bookingForm);
  const service = values.get('car-need');
  if (service) bookingDemo.querySelector('[name="service"]').value = service;
});

bookingDemo?.querySelectorAll('.slot').forEach((slot) => {
  slot.addEventListener('click', () => {
    bookingDemo.querySelectorAll('.slot').forEach((item) => item.classList.remove('is-selected'));
    slot.classList.add('is-selected');
    bookingDemo.querySelector('[name="time"]').value = slot.dataset.slot;
  });
});

bookingDemo?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingDemo.reportValidity()) return;
  const data = new FormData(bookingDemo);
  bookingDemo.classList.add('is-hidden');
  bookingLoading.classList.add('is-visible');
  window.setTimeout(() => {
    bookingLoading.classList.remove('is-visible');
    bookingSuccess.classList.add('is-visible');
    const name = data.get('name');
    const service = data.get('service');
    const time = data.get('time');
    bookingSummary.textContent = `Gracias, ${name}. Dejamos apartada una revisión de ${service.toLowerCase()} alrededor de las ${time}. Confírmala con el taller por WhatsApp.`;
    whatsappLink.href = `https://wa.me/523312345678?text=${encodeURIComponent(`Hola, soy ${name}. Quiero confirmar una cita para ${service} a las ${time}.`)}`;
  }, 1200);
});

const assistantAnswers = {
  '¿Qué revisan en un diagnóstico?': 'Revisamos el síntoma, escaneamos cuando hace falta y te mostramos la causa antes de hablar de reparación.',
  '¿Cuánto tarda una revisión?': 'Una revisión inicial suele tomar entre 30 y 60 minutos. Te confirmamos el tiempo al recibir tu coche.',
  'Quiero hablar por WhatsApp': 'Claro. Puedes escribir directamente al 33 1234 5678 y te respondemos en horario de taller.'
};
const addAssistantMessage = (text, user = false) => {
  const bubble = document.createElement('div');
  bubble.className = `assistant-bubble${user ? ' is-user' : ''}`;
  bubble.textContent = text;
  assistantMessages?.appendChild(bubble);
  assistantMessages?.scrollTo({ top: assistantMessages.scrollHeight, behavior: 'smooth' });
};
assistantToggle?.addEventListener('click', () => {
  const open = assistant.classList.toggle('is-open');
  assistant.setAttribute('aria-hidden', String(!open));
  assistantToggle.setAttribute('aria-expanded', String(open));
});
document.querySelector('#assistant-close')?.addEventListener('click', () => {
  assistant.classList.remove('is-open');
  assistant.setAttribute('aria-hidden', 'true');
  assistantToggle.setAttribute('aria-expanded', 'false');
});
document.querySelectorAll('[data-assistant-question]').forEach((button) => {
  button.addEventListener('click', () => {
    const question = button.dataset.assistantQuestion;
    addAssistantMessage(question, true);
    window.setTimeout(() => addAssistantMessage(assistantAnswers[question] || 'Te orientamos por WhatsApp.'), 350);
  });
});

document.querySelectorAll('[data-social-demo]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const toast = document.createElement('div');
    toast.className = 'toast is-visible';
    toast.textContent = 'Aquí conectaríamos el Instagram o Facebook real del taller.';
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 2600);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#' || targetId === '#agenda') return;
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
