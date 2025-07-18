export function enableMobileProjectHoverFallback() {
  document.querySelectorAll('.project-image-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', (e) => {
      if (wrapper.classList.contains('active')) return;

      document.querySelectorAll('.project-image-wrapper.active').forEach(el => {
        if (el !== wrapper) el.classList.remove('active');
      });

      wrapper.classList.add('active');

      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
          wrapper.classList.remove('active');
        }
      }, { once: true });
    });
  });
}
