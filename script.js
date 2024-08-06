const userList = document.querySelector("#userList");
const growingUp = document.querySelector("#growingUp");
const growingDown = document.querySelector("#growingDown");
const alphabet = document.querySelector("#alphabet");
const sortOptions = document.getElementById("sortOptions");

let users = [];

async function fetchUsers() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  users = await response.json();
  renderUsers(users);
}

fetchUsers();

function renderUsers(users) {
  userList.textContent = "";
  users.forEach((user) => {
    const listItem = document.createElement("div");
    userList.appendChild(listItem);
    listItem.className =
      "d-flex align-items-center justify-content-between p-2 border rounded-3";

    const idItem = document.createElement("h5");
    idItem.innerHTML = `id: ${user.id} `;
    listItem.appendChild(idItem);

    const titleItem = document.createElement("h4");
    titleItem.innerHTML = user.name;
    listItem.appendChild(titleItem);

    const emailItem = document.createElement("h6");
    emailItem.innerHTML = `email: ${user.email} `;
    listItem.appendChild(emailItem);

    const websiteItem = document.createElement("h4");
    websiteItem.innerHTML = `website: ${user.website} `;
    listItem.appendChild(websiteItem);
  });
}

growingUp.addEventListener("click", growingUpFunc);

function growingUpFunc() {
  const sortedUsers = [...users].sort((a, b) => a.id - b.id);

  renderUsers(sortedUsers);
}

growingDown.addEventListener("click", growingDownFunc);

function growingDownFunc() {
  const sortedUsers = [...users].sort((a, b) => b.id - a.id);
  renderUsers(sortedUsers);
}

alphabet.addEventListener("click", alphabetFunc);
function alphabetFunc() {
  const sortedUsers = [...users].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  renderUsers(sortedUsers);
}

sortOptions.addEventListener("change", sortUsers);

function sortUsers() {
  const selectedOption = sortOptions.value;
  let sortedUsers;

  switch (selectedOption) {
    case "growingUp":
      sortedUsers = [...users].sort((a, b) => a.id - b.id);
      break;
    case "growingDown":
      sortedUsers = [...users].sort((a, b) => b.id - a.id);
      break;
    case "alphabet":
      sortedUsers = [...users].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      break;
    default:
      sortedUsers = users;
  }

  renderUsers(sortedUsers);
}
