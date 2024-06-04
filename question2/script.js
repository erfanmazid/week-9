const baseUrl = "http://localhost:3000";

const name = document.getElementById("name");
const email = document.getElementById("email");
const submit = document.getElementById("submit");

const tbody = document.querySelector("tbody");

function fetchUser() {
  fetch(`${baseUrl}/users`)
    .then((res) => res.json())
    .then((data) => renderUser(data));
  console.log("mmd");
}

function renderUser(users) {
  users.forEach((user) => {
    const bodyTr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.textContent = user.id;

    const nameTd = document.createElement("td");
    nameTd.textContent = user.first_name + " " + user.last_name;

    const emailTd = document.createElement("td");
    emailTd.textContent = user.email;

    const btnTd = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "delete";
    btnTd.appendChild(btn);

    bodyTr.appendChild(idTd);
    bodyTr.appendChild(nameTd);
    bodyTr.appendChild(emailTd);
    bodyTr.appendChild(btnTd);

    tbody.appendChild(bodyTr);
  });
}
fetchUser();
