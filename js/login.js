var users = [];

if (document.cookie) {
  window.location.href = "../pages/mello.html";
} else {
  getAPIAndParseJSON();
}

function getAPIAndParseJSON() {
  let url =
    "https://30da33c9-2d02-4d7c-a10b-93fe29f0fdf6.mock.pstmn.io/v1/users";

  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      for (var i = 0; i < out.length; i++) {
        users.push({
          id: out[i].id,
          email: out[i].email,
          name: out[i].name,
          password: out[i].password,
        });
      }
    })
    .catch((err) => {
      throw err;
    });
}

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
      date.setTime(date.getTime() + 1 * 60 * 1000);
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
