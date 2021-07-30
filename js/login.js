var users = [];

const getAPIAndParseJSON = async () => {
  try {
    const res = await fetch(
      "https://b3f2e9d6-d881-4841-921d-22f2c043fdcd.mock.pstmn.io/v1/users"
    );

    const data = await res.json();

    for (var i = 0; i < data.length; i++) {
      users.push({
        id: data[i].id,
        email: data[i].email,
        name: data[i].name,
        password: data[i].password,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

if (document.cookie) {
  window.location.href = "../pages/mello.html";
} else {
  getAPIAndParseJSON();
}

// function getAPIAndParseJSON() {
//   let url =
//     "https://b3f2e9d6-d881-4841-921d-22f2c043fdcd.mock.pstmn.io/v1/users";

//   fetch(url)
//     .then((res) => res.json())
//     .then((out) => {
//       for (var i = 0; i < out.length; i++) {
//         users.push({
//           id: out[i].id,
//           email: out[i].email,
//           name: out[i].name,
//           password: out[i].password,
//         });
//       }
//     })
//     .catch((err) => {
//       throw err;
//     });
// }

function login() {
  var userFound = false;

  for (let index = 0; index < users.length; index++) {
    if (
      document.getElementById("email").value === users[index].email &&
      document.getElementById("pass").value === users[index].password
    ) {
      console.log(users[index].password);
      userFound = true;
      var date = new Date();
      date.setTime(date.getTime() + 5 * 60 * 1000);
      document.cookie =
        "name=" +
        users[index].name +
        ",userID=" +
        users[index].id +
        "; expires=" +
        date.toGMTString() +
        ";";
      window.location.href = "../pages/mello.html";
      break;
    }
  }

  if (!userFound) alert("wrong username or pass");
}
