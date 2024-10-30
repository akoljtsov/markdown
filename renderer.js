const { ipcRenderer } = require('electron');
const marked = require('marked');

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const openButton = document.getElementById('open-button');
const saveButton = document.getElementById('save-button');

function updatePreview() {
    preview.innerHTML = marked.parse(editor.value);
}

editor.addEventListener('input', updatePreview);

openButton.addEventListener('click', async () => {
    const content = await ipcRenderer.invoke('open-file');
    if (content) {
        editor.value = content;
        updatePreview();
    }
});

saveButton.addEventListener('click', () => {
    const content = editor.value;
    ipcRenderer.invoke('save-file', content);
});
