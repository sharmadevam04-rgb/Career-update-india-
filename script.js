(function () {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const search = document.getElementById('searchInput');
  const cards = Array.from(document.querySelectorAll('.article-card'));
  const filters = Array.from(document.querySelectorAll('.filter'));
  const noResults = document.getElementById('noResults');
  let activeCategory = 'all';
  function filterCards() {
    const query = (search ? search.value : '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(function (card) {
      const categoryMatches = activeCategory === 'all' || card.dataset.category === activeCategory;
      const searchMatches = !query || ((card.dataset.search || '') + ' ' + card.innerText).toLowerCase().includes(query);
      const show = categoryMatches && searchMatches;
      card.hidden = !show;
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible > 0;
  }
  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      activeCategory = button.dataset.category;
      filters.forEach(function (filter) { filter.classList.toggle('active', filter === button); });
      filterCards();
    });
  });
  if (search) search.addEventListener('input', filterCards);
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
