(() => {
  const root = document.documentElement;
  const key = 'lenguas-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;

  try {
    preference = localStorage.getItem(key);
  } catch {
    // The switch still works when browser storage is unavailable.
  }

  if (preference !== 'light' && preference !== 'dark') preference = null;
  let toggle;
  let label;

  function update() {
    const theme = preference ?? (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    if (toggle) {
      toggle.setAttribute('aria-checked', String(theme === 'dark'));
      label.textContent = theme === 'dark' ? 'Noche' : 'Día';
    }
  }

  update();
  system.addEventListener('change', update);

  document.addEventListener('DOMContentLoaded', () => {
    const navigation = document.querySelector('.portal-nav nav');
    if (!navigation) return;

    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('role', 'switch');
    toggle.setAttribute('aria-label', 'Modo nocturno');
    toggle.innerHTML = '<span class="theme-track" aria-hidden="true"></span><span aria-hidden="true"></span>';
    label = toggle.lastElementChild;
    toggle.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(key, preference);
      } catch {
        // Keep the selected theme for this page.
      }
      update();
    });
    update();
    navigation.append(toggle);
  });
})();
