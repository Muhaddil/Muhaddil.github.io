const REDIRECT_DELAY = 10000; 

function getContentFor404() {
  const path = window.location.pathname.toLowerCase();
  const routes = [
    {
      match: "/rsswikipagecreator",
      title: "404 - EOL",
      message:
        "Este proyecto llegó a su fin de vida (EOL) por problemas con dependencias requeridas y ya no está disponible.",
      extra:
        'Si buscas poder seguir subiendo tus descubrimientos, puedes usar la <a href="https://wiki.nmscd.com/?ref=nmscd">herramienta pública del NMSCD</a>.',
      buttonText: "Regresar al Menú Principal",
      buttonHref: "/",
    },
  ];
  const match = routes.find((r) => path.startsWith(r.match));
  return (
    match || {
      title: "404 - No encontrado",
      message:
        "Lo sentimos, esta página no existe.",
      buttonText: "Regresar al Menú Principal",
      buttonHref: "/",
    }
  );
}

function createParticle(e) {
  const particle = document.createElement("div");
  particle.className = "particle";
  const size = Math.random() * 15 + 5;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = e.clientX - size / 2 + "px";
  particle.style.top = e.clientY - size / 2 + "px";
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  const content = getContentFor404();
  document.querySelector("h1").textContent = content.title;
  document.querySelector("p").textContent = content.message;
  if (content.extra) {
    const extraP = document.createElement("p");
    extraP.innerHTML = content.extra;
    extraP.className = 'extra-info';
    extraP.setAttribute("data-aos", "fade-up");
    document.querySelector("p").after(extraP);
  }
  const boton = document.querySelector(".boton");
  boton.textContent = content.buttonText;
  boton.href = content.buttonHref;

  AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  const cursor = document.querySelector(".custom-cursor");
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
  document.addEventListener("click", createParticle);
});

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => preloader.remove(), 500);
  AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  setTimeout(function () {
    const img = document.querySelector("img");
    img.classList.add("fly-away");
    setTimeout(function () {
      document.body.style.transition = "opacity 1s ease";
      document.body.style.opacity = "0";
      setTimeout(function () {
        window.location.href = "/?fade=true";
      }, 1000);
    }, 2000);
  }, REDIRECT_DELAY);
});
