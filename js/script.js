const blocks = document.querySelectorAll('.block');
const workspace = document.querySelector('.workspace');
const output = document.querySelector('.output');

blocks.forEach(block => {
  block.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.dataset.code);
  });
});

workspace.addEventListener('dragover', (event) => {
  event.preventDefault();
});

workspace.addEventListener('drop', (event) => {
  event.preventDefault();
  const code = event.dataTransfer.getData('text/plain');

  const newBlock = document.createElement('div');
  newBlock.classList.add('block');
  newBlock.innerHTML = code;
  workspace.appendChild(newBlock);

  renderOutput();
});

function renderOutput() {
  output.innerHTML = workspace.innerHTML;
}