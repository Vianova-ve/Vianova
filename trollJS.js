//troll
function adivinar() {
  const numero = document.getElementById("numero").value;
  const resultado = document.getElementById("resultado");
  const titulo = document.getElementById("titulo");
  const input = document.getElementById("numero");
  const boton = document.getElementById("btn");

  if (numero === "") {
    resultado.innerHTML = "<p>¡No ingresaste ningún número!</p>";
    resultado.style.display = "block";
    return;
  }

  if (boton.innerText === "Adivinar") {
    // Mostrar resultado
    titulo.classList.add("hidden");
    input.classList.add("hidden");

    resultado.innerHTML = `
      <p>Pensabas en el</p>
      <div class="numero-mostrado">${numero}</div>
      <div class="emoji">👻</div>
    `;
    resultado.style.display = "block";
    boton.innerText = "Volver a intentar";
  } else {
    // Reiniciar
    titulo.classList.remove("hidden");
    input.classList.remove("hidden");
    input.value = "";
    resultado.style.display = "none";
    boton.innerText = "Adivinar";
  }
}

// Inicializar partículas
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.1,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.5
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true
    }
  },
  retina_detect: true
});