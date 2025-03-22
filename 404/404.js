AOS.init({
  duration: 1000,
  once: true,
  easing: 'ease-in-out'
});

// Cursor personalizado
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a').forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});

// Efecto partículas
function createParticle(e) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 15 + 5;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.left = e.clientX - size / 2 + 'px';
  particle.style.top = e.clientY - size / 2 + 'px';

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1000);
}

document.addEventListener('click', createParticle);

// Animación de redirección
window.onload = function () {
  setTimeout(function () {
    const img = document.querySelector("img");
    img.classList.add("fly-away");

    setTimeout(function () {
      document.body.style.transition = 'opacity 1s ease';
      document.body.style.opacity = '0';

      setTimeout(function () {
        window.location.href = "/?fade=true";
      }, 1000);
    }, 2000);
  }, 4000);
};