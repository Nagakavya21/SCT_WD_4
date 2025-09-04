const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskList = document.getElementById('taskList');

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (!taskText) {
    Swal.fire('Oops!', 'Please enter a task!', 'warning');
    return;
  }

  const li = document.createElement('li');

  const content = document.createElement('div');
  content.innerHTML = `
    <span>🌟 ${taskText}</span>
    ${taskDate ? `<small>📅 ${new Date(taskDate).toLocaleString()}</small>` : ""}
  `;

  const buttons = document.createElement('div');
  buttons.classList.add('task-buttons');

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-btn');
  completeBtn.textContent = '✅';
  completeBtn.onclick = () => {
    li.classList.toggle('completed');
    if (li.classList.contains('completed')) launchConfetti();
  };

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  editBtn.textContent = '✏️';
  editBtn.onclick = () => editTask(content);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '🗑️';
  deleteBtn.onclick = () => li.remove();

  buttons.appendChild(completeBtn);
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  li.appendChild(content);
  li.appendChild(buttons);
  taskList.appendChild(li);

  taskInput.value = '';
  dateInput.value = '';
}

function editTask(content) {
  const currentText = content.querySelector('span').innerText.replace("🌟 ", "");
  Swal.fire({
    title: 'Edit your mission 🚀',
    input: 'text',
    inputValue: currentText,
    showCancelButton: true,
    confirmButtonText: 'Save'
  }).then((result) => {
    if (result.isConfirmed && result.value.trim()) {
      content.querySelector('span').innerText = `🌟 ${result.value.trim()}`;
    }
  });
}

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
}
