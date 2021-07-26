function login() {
  if (
    document.getElementById("email").value === "admin@admin.com" &&
    document.getElementById("pass").value === "pass"
  ) {
    window.location.href = "../pages/mello.html";
  } else {
    alert("wrong username or pass");
  }
}
