/**
 * Section Background Icons — Ícones jurídicos animados em todas as seções
 * Bootstrap Icons relacionados à advocacia
 */
(function () {
  // Lista de ícones Bootstrap relacionados à advocacia
  const ICONS = [
    'bi-bank', 'bi-hammer', 'bi-balance-scale',
    'bi-shield-check', 'bi-briefcase', 'bi-journal-text',
    'bi-file-earmark-text', 'bi-award', 'bi-person-badge',
    'bi-pen', 'bi-book', 'bi-newspaper',
    'bi-clipboard2-check', 'bi-patch-check', 'bi-file-lock',
    'bi-building', 'bi-person-lines-fill', 'bi-search',
    'bi-star', 'bi-check-circle', 'bi-file-earmark-ruled',
    'bi-bookmark-check', 'bi-key', 'bi-lock',
  ];

  const ANIMATIONS = ['floatIcon', 'floatIconB', 'floatIconC'];

  // Seções que vão receber os ícones (todas)
  const sections = document.querySelectorAll('section, .counters');

  sections.forEach(section => {
    // Garante position:relative para o container funcionar
    const pos = window.getComputedStyle(section).position;
    if (pos === 'static') section.style.position = 'relative';

    // Cria o container de ícones
    const container = document.createElement('div');
    container.className = 'section-bg-icons';
    container.setAttribute('aria-hidden', 'true');

    // Quantidade de ícones por seção (entre 8 e 14)
    const count = 8 + Math.floor(Math.random() * 7);

    for (let i = 0; i < count; i++) {
      const icon = document.createElement('i');
      const iconClass = ICONS[Math.floor(Math.random() * ICONS.length)];
      icon.className = `bi ${iconClass}`;

      // Posição aleatória espalhada pela seção
      const top  = 3  + Math.random() * 90;   // 3% a 93%
      const left = 2  + Math.random() * 92;   // 2% a 94%

      // Tamanho aleatório entre 2rem e 6rem
      const size = (2 + Math.random() * 4).toFixed(1);

      // Animação aleatória
      const anim  = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];

      // Duração e delay aleatórios
      const dur   = (10 + Math.random() * 14).toFixed(1);
      const delay = (Math.random() * 6).toFixed(1);

      // Opacidade base variada
      const opacity = (0.12 + Math.random() * 0.20).toFixed(2);

      icon.style.cssText = `
        top:${top}%;
        left:${left}%;
        font-size:${size}rem;
        animation-name:${anim};
        animation-duration:${dur}s;
        animation-delay:-${delay}s;
        opacity:${opacity};
        color:rgba(198,161,91,${opacity});
      `;

      container.appendChild(icon);
    }

    // Insere o container como primeiro filho da seção
    section.insertBefore(container, section.firstChild);
  });
})();
