document.addEventListener('DOMContentLoaded', () => {
  const iframes = document.querySelectorAll('iframe[data-src]');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.setAttribute('src', iframe.dataset.src);
        obs.unobserve(iframe);
      }
    });
  });

  iframes.forEach(iframe => observer.observe(iframe));
});
