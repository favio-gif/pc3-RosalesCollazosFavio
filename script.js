const loader = document.getElementById('pageLoader');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const form = document.getElementById('contactForm');
const result = document.getElementById('formResult');
const preview = document.getElementById('messagePreview');
const submitButton = document.getElementById('submitButton');
const copyButton = document.getElementById('copyButton');

window.addEventListener('load', () => {
  window.setTimeout(() => loader.classList.add('is-hidden'), 850);
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  loader.classList.add('is-hidden');
}

themeToggle.addEventListener('click', () => {
  const light = document.body.classList.toggle('theme-light');
  themeLabel.textContent = light ? 'MODO NOCHE' : 'MODO LUZ';
  themeToggle.setAttribute('aria-pressed', String(light));
  themeToggle.setAttribute('aria-label', light ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
});

const projects = {
  orbita: {
    number: 'PROYECTO 01 / 03',
    name: 'ÓRBITA',
    description: 'Propuesta ficticia de identidad visual para una marca que busca destacar con formas circulares, contraste cromático y un sistema gráfico flexible. Su tarjeta utiliza una rotación 2D al interactuar.',
    tech: 'IDENTIDAD VISUAL · CSS ROTATE · TRANSITION'
  },
  pulso: {
    number: 'PROYECTO 02 / 03',
    name: 'PULSO',
    description: 'Concepto ficticio de dashboard con indicadores y gráficos construidos visualmente con HTML y CSS. Su tarjeta aumenta de tamaño mediante una transformación de escala.',
    tech: 'INTERFAZ DE DATOS · CSS SCALE · TRANSITION'
  },
  lumina: {
    number: 'PROYECTO 03 / 03',
    name: 'LÚMINA',
    description: 'Exploración ficticia de una landing page editorial con composición móvil, colores suaves y tipografía contundente. Su tarjeta se desplaza en dos ejes al interactuar.',
    tech: 'DISEÑO WEB · CSS TRANSLATE · TRANSITION'
  }
};

const projectModal = document.getElementById('projectModal');
projectModal.addEventListener('show.bs.modal', event => {
  const project = projects[event.relatedTarget?.dataset.project];
  if (!project) return;
  document.getElementById('projectModalLabel').textContent = project.number;
  document.getElementById('projectModalTitle').textContent = project.name;
  document.getElementById('projectModalDescription').textContent = project.description;
  document.getElementById('projectModalTech').textContent = project.tech;
});

document.querySelectorAll('#mainMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mainMenu');
    if (menu.classList.contains('show') && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  event.stopPropagation();
  form.classList.add('was-validated');
  if (!form.checkValidity()) return;

  submitButton.disabled = true;
  submitButton.classList.add('is-loading');
  result.hidden = true;

  window.setTimeout(() => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    preview.textContent = `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`;
    result.hidden = false;
    submitButton.disabled = false;
    submitButton.classList.remove('is-loading');
    copyButton.textContent = 'COPIAR MENSAJE ↗';
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 650);
});

form.addEventListener('reset', () => {
  form.classList.remove('was-validated');
  result.hidden = true;
  preview.textContent = '';
  submitButton.disabled = false;
  submitButton.classList.remove('is-loading');
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preview.textContent);
    copyButton.textContent = '¡COPIADO! ✓';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(preview);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    copyButton.textContent = 'SELECCIONADO: PRESIONA CTRL + C';
  }
});
