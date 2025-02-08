document.addEventListener('DOMContentLoaded', function() {
  // Fetch and insert the header
  fetch('header.html')
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
      });

  // Fetch and insert the footer
  fetch('footer.html')
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML('beforeend', data);
      });
});

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const date = new Date().toLocaleString();

  const user = { name, email, date };
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  updateUserList();
});

function updateUserList() {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach((user, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" data-index="${index}"> Nome: ${user.name}, Email: ${user.email}, Data: ${user.date}`;
    userList.appendChild(li);
  });
}

document.getElementById('deleteButton').addEventListener('click', function() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const checkboxes = document.querySelectorAll('#userList input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    const index = checkbox.getAttribute('data-index');
    users.splice(index, 1);
  });
  localStorage.setItem('users', JSON.stringify(users));
  updateUserList();
});

document.getElementById('deleteAllButton').addEventListener('click', function() {
  localStorage.clear();
  updateUserList();
});

document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  filteredUsers.forEach((user, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" data-index="${index}"> Nome: ${user.name}, Email: ${user.email}, Data: ${user.date}`;
    userList.appendChild(li);
  });
});

document.addEventListener('DOMContentLoaded', updateUserList);

document.getElementById('clearButton').addEventListener('click', function() {
  document.getElementById('cadastroForm').reset();
});