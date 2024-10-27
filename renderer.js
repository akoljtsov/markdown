const { marked } = require('marked');

window.onload = () => {
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');

  editor.addEventListener('input', () => {
    const markdownText = editor.value;
    preview.innerHTML = marked(markdownText);
  });
};
