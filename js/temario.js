const search = document.querySelector('#lesson-search');
const lessons = [...document.querySelectorAll('#lesson-list li')];
const status = document.querySelector('#lesson-search-status');

function normalize(text) {
  return text.toLocaleLowerCase('es').normalize('NFD').replace(/\p{M}/gu, '').trim();
}

const titles = lessons.map(lesson => normalize(lesson.textContent));

search.closest('.syllabus-search').hidden = false;
search.addEventListener('input', () => {
  const query = normalize(search.value);
  let matches = 0;

  lessons.forEach((lesson, index) => {
    lesson.hidden = !titles[index].includes(query);
    if (!lesson.hidden) matches += 1;
  });

  status.textContent = query ? `${matches} ${matches === 1 ? 'clase encontrada' : 'clases encontradas'}` : '';
});
