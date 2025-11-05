// Basic interactivity: reveal on scroll, modal handling, Netlify form submit UX
document.addEventListener('DOMContentLoaded', function () {

  // 1) Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

  // 2) Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3) Modal open / close for Resume Request
  const resumeModal = document.getElementById('resumeModal');
  const requestBtns = document.querySelectorAll('#requestResumeBtn, #requestResumeBtn2, #requestResumeBtn, #requestResumeBtn2, #requestResumeBtn, #resumeQuickBtn');
  const closeModal = document.getElementById('closeModal');
  const cancelModal = document.getElementById('cancelModal');

  function openModal() {
    resumeModal.setAttribute('aria-hidden', 'false');
  }
  function closeModalFn() {
    resumeModal.setAttribute('aria-hidden', 'true');
  }

  requestBtns.forEach(b => {
    if (b) b.addEventListener('click', openModal);
  });
  if (closeModal) closeModal.addEventListener('click', closeModalFn);
  if (cancelModal) cancelModal.addEventListener('click', closeModalFn);
  // close modal on outside click
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeModalFn();
  });

  // 4) Netlify forms: show result message and reset
  const contactForm = document.getElementById('contactForm');
  const formResult = document.getElementById('formResult');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // let Netlify handle the POST normally; but show immediate feedback
      formResult.hidden = false;
      formResult.textContent = 'Sending...';
      setTimeout(() => {
        formResult.textContent = 'Thank you! Your message was sent. I will respond to you soon.';
        contactForm.reset();
      }, 900);
    });
  }

  // 5) Resume request form handling
  const resumeForm = document.getElementById('resumeForm');
  const resumeResult = document.getElementById('resumeResult');
  if (resumeForm) {
    resumeForm.addEventListener('submit', function (e) {
      // Netlify will capture the submission because of data-netlify="true" and form-name
      resumeResult.hidden = false;
      resumeResult.textContent = 'Request sent. You will receive a confirmation soon.';
      // close automatically after 2s
      setTimeout(() => {
        resumeForm.reset();
        resumeResult.hidden = true;
        // Close modal
        resumeModal.setAttribute('aria-hidden', 'true');
      }, 1800);
    });
  }

  // 6) Quick Resume request button: opens user's Gmail compose as fallback for some users
  const quickBtn = document.getElementById('resumeQuickBtn');
  if (quickBtn) {
    quickBtn.addEventListener('click', function () {
      // Prefilled subject and body
      const to = 'deepanshikaushik.work@gmail.com';
      const subject = encodeURIComponent('Resume Request — Deepanshi Kaushik');
      const body = encodeURIComponent('Hello Deepanshi,%0D%0A%0D%0AI would like to request your resume. Please share it with me.%0D%0A%0D%0AThanks,%0D%0A[Your name]');
      // This opens Gmail compose if user is using Gmail; else it may open mail client depending on browser
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + subject + '&body=' + body, '_blank');
    });
  }
});
