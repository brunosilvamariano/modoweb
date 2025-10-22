/* ===== EFEITO DE PARTÍCULAS NO HERO ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      "particles": {
        "number": { "value": 60 },
        "color": { "value": "#3f6fd3" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.25 },
        "size": { "value": 2 },
        "line_linked": {
          "enable": true,
          "distance": 120,
          "color": "#3f6fd3",
          "opacity": 0.90,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.2,
          "direction": "none",
          "out_mode": "out"
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "repulse" }
        },
        "modes": {
          "repulse": { "distance": 100, "duration": 0.4 }
        }
      },
      "retina_detect": true
    });
  }
});
