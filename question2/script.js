const baseUrl = "http://localhost:3000";

const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const submit = document.getElementById("submit");

const tbody = document.querySelector("tbody");

const pagination = document.querySelector(".pagination");

let pageNow = 1;
let pagesNum = 0;
let userNum = 0;

fetch(`${baseUrl}/users`)
  .then((res) => res.json())
  .then((data) => (userNum = data.length));

function fetchUser() {
  fetch(`http://localhost:3000/users/?_page=${pageNow}&_per_page=6`)
    .then((res) => res.json())
    .then((data) => renderUser(data.data));
}

function renderUser(users) {
  tbody.innerHTML = "";

  users.forEach((user) => {
    const bodyTr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.textContent = user.id;

    const nameTd = document.createElement("td");
    nameTd.textContent = user.first_name;

    const emailTd = document.createElement("td");
    emailTd.textContent = user.email;

    const btnTd = document.createElement("td");
    const btn = document.createElement("button");
    // const delet
    btn.textContent = "delete";
    btn.setAttribute("onclick", `deleteUser(${user.id})`);
    btnTd.appendChild(btn);

    bodyTr.appendChild(idTd);
    bodyTr.appendChild(nameTd);
    bodyTr.appendChild(emailTd);
    bodyTr.appendChild(btnTd);

    tbody.appendChild(bodyTr);
  });
}

function addUser() {
  const name = userName.value;
  const email = userEmail.value;

  if (name && email) {
    const newUser = {
      first_name: name,
      email: email,
      id: `${userNum + 1}`,
    };

    submit.textContent = "Adding User ....";
    submit.disabled = true;

    fetch(`${baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    });

    cleanForm();

    submit.textContent = "Add User";
    submit.disabled = false;

    fetchUser();
  }
}

function cleanForm() {
  name.value = "";
  email.value = "";
}

function deleteUser(id) {
  fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
  });

  fetchUser();
}

async function paginationBtn() {
  pagination.innerHTML = "";
  await fetch(`http://localhost:3000/users/?_page=${pageNow}&_per_page=6`)
    .then((res) => res.json())
    .then((data) => (pagesNum = data.pages));

  for (let i = 1; i < pagesNum + 1; i++) {
    let btnNumber = btnCreat(i);
    pagination.appendChild(btnNumber);
  }
}

function btnCreat(page) {
  let btnNew = document.createElement("button");
  btnNew.textContent = page;
  //   btnNew.setAttribute("onclick", `${(pageNow = page)}`);

  if (page === pageNow) {
    btnNew.style.backgroundColor = "green";
  }

  btnNew.addEventListener("click", () => {
    pageNow = page;
    fetchUser();
    paginationBtn();
  });

  return btnNew;
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  addUser();
});

fetchUser();
paginationBtn();
