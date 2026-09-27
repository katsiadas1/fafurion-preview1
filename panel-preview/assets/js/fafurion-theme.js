/* Presentation enhancement only; authentication remains in the original controllers. */
(() => {
  function enhance() {
    const greek = document.documentElement.lang.toLowerCase().startsWith('el');
    document.querySelectorAll('input[type="password"]').forEach(input => {
      if (input.closest('.ff-password-wrap')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'ff-password-wrap';
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'ff-password-toggle';
      toggle.setAttribute('aria-pressed', 'false');
      const tr = value => window.FafurionI18n?.t(value) || value;
      const show = tr('Show');
      const hide = tr('Hide');
      toggle.textContent = show;
      toggle.setAttribute('aria-label', tr('Show password'));
      toggle.addEventListener('click', () => {
        const visible = input.type === 'password';
        input.type = visible ? 'text' : 'password';
        toggle.textContent = tr(visible ? 'Hide' : 'Show');
        toggle.setAttribute('aria-pressed', String(visible));
        toggle.setAttribute('aria-label', tr(visible ? 'Hide password' : 'Show password'));
      });
      wrapper.appendChild(toggle);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();
