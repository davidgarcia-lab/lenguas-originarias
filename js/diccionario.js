const search = document.querySelector('#dictionary-search');
const status = document.querySelector('#dictionary-status');
const normalize = text => text.toLocaleLowerCase('es').normalize('NFD').replace(/\p{M}/gu, '');
const blocks = [...document.querySelectorAll('.dictionary-block')].map(section => ({
  section,
  link: document.querySelector(`[href="#${section.id}"]`),
  entries: [...section.querySelectorAll('li')].map(item => ({item, text: normalize(item.textContent)}))
}));

search.closest('.syllabus-search').hidden = false;
search.addEventListener('input', () => {
  const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
  let total = 0;
  for (const {section, link, entries} of blocks) {
    let found = 0;
    for (const {item, text} of entries) {
      item.hidden = !terms.every(term => text.includes(term));
      if (!item.hidden) found += 1;
    }
    section.hidden = link.hidden = found === 0;
    total += found;
  }
  status.textContent = terms.length ? `${total} ${total === 1 ? 'resultado' : 'resultados'}` : '';
});

const tools = document.querySelector('.dictionary-tools');
const dictionary = tools.closest('.dictionary');
new ResizeObserver(() => {
  dictionary.style.setProperty('--dictionary-offset', `${tools.offsetHeight + 16}px`);
}).observe(tools);
