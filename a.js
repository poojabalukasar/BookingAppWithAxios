const form = document.getElementById("regiForm");
const userList = document.getElementById("user");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("ph").value;
  const time = document.getElementById("time").value;
  const tm = document.getElementById("tm").value;

  const user = {
    firstName: name,
    email: email,
    phone: phone,
    time: time,
    tm: tm,
  };

  addUser(user);
  form.reset();
});

function addUser(user) {
  axios
    .post(
      "https://crudcrud.com/api/c9f6eda0dcf4428dbcf77ee079c7b397/appointmentData",
      user
    )
    .then((res) => {
      user._id = res.data._id;
      displayUser(user); // Display the user in the list
    })
    .catch((err) => console.log(err));
}

function displayUser(user) {
  const li = document.createElement("li");

  // Create a contenteditable div for each user info
  const nameDiv = document.createElement("div");
  nameDiv.textContent = `Username: ${user.firstName}`;
  const emailDiv = document.createElement("div");
  emailDiv.textContent = `Email: ${user.email}`;
  const phoneDiv = document.createElement("div");
  phoneDiv.textContent = `Phone: ${user.phone}`;

  // Save button for editing
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.style.display = "none"; // Initially hide the button
  saveButton.addEventListener("click", () => {
    // Update the user's information here
    user.firstName = nameDiv.textContent.trim();
    user.email = emailDiv.textContent.trim();
    user.phone = phoneDiv.textContent.trim();
    updateUser(user);

    // Hide the save button after saving
    saveButton.style.display = "none";
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    // Show the save button
    saveButton.style.display = "block";
    nameDiv.contentEditable = true;
    emailDiv.contentEditable = true;
    phoneDiv.contentEditable = true;
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    // Delete the user here
    deleteUser(user);
    userList.removeChild(li);
  });

  li.appendChild(nameDiv);
  li.appendChild(emailDiv);
  li.appendChild(phoneDiv);
  li.appendChild(saveButton);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  userList.appendChild(li);
}

function updateUser(user) {
  axios
    .put(
      `https://crudcrud.com/api/c9f6eda0dcf4428dbcf77ee079c7b397/appointmentData/${user._id}`,
      user
    )
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
}

function deleteUser(user) {
  axios
    .delete(
      `https://crudcrud.com/api/c9f6eda0dcf4428dbcf77ee079c7b397/appointmentData/${user._id}`
    )
    .then(() => console.log("User deleted"))
    .catch((error) => console.log(error));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/c9f6eda0dcf4428dbcf77ee079c7b397/appointmentData"
    )
    .then((res) => {
      const users = res.data;
      for (let i = 0; i < users.length; i++) {
        displayUser(users[i]);
      }
    })
    .catch((error) => console.log(error));
});
