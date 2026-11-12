const syllabus = document.querySelector('.course-sidebar .class-list');
const current = syllabus?.querySelector('[aria-current="page"]');

if (current && syllabus.scrollHeight > syllabus.clientHeight) {
  const offset = current.getBoundingClientRect().top - syllabus.getBoundingClientRect().top;
  syllabus.scrollTop = Math.max(0, offset - syllabus.clientHeight / 2);
}
