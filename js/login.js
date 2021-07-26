function login() {
  console.log(document.getElementById("email").value);
  console.log(document.getElementById("pass").value);

  if (
    document.getElementById("email").value === "admin@admin.com" &&
    document.getElementById("pass").value === "pass"
  ) {
    (window.location.href = "../pages/mello.html"), true;
    console.log("asd");
  } else {
    alert("wrong username or pass");
  }

  // return false;
}
