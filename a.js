// const form = document.getElementById("regiForm");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;
//   const phone = document.getElementById("ph").value;
//   const time = document.getElementById("time").value;
//   const tm = document.getElementById("tm").value;

//   const userInfo = [name, email, phone, time, tm];

//   localStorage.setItem("userInformation", JSON.stringify(userInfo));
//   const userInfobyLocal = localStorage.getItem("userInformation");
//   const u = JSON.parse(userInfobyLocal);

//   console.log(u);
//   // console.log("Name : ", name);
//   // console.log("Email : ", email);
//   // console.log("Phone : ", phone);
//   // console.log("Day : ", time);
//   // console.log("Time : ", tm);
// });

const form = document.getElementById("regiForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("ph").value;
  const time = document.getElementById("time").value;
  const tm = document.getElementById("tm").value;
  const userList = document.getElementById("user");

  //user OBJECT
  const user = {
    firstName: name,
    email: email,
    phone: phone,
    time: time,
    tm: tm,
  };

  addUser(user);

  form.reset();

  //Add appointment data in crud
  function addUser(user) {
    axios
      .post(
        "https://crudcrud.com/api/6794f1d7e8a847b6b6b62038138cb075/appointmentData",
        user
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
});
