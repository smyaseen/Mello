function add() {
  var select = document.getElementById("addTo");

  if (select.value === "todo") {
    addCell("doing", "done", "todo");
  } else if (select.value === "doing") {
    addCell("todo", "done", "doing");
  } else {
    addCell("todo", "doing", "done");
  }
}

function addCell(option1, option2, addTo) {
  var p = document.createElement("p");
  p.innerHTML = document.getElementById("inpText").value;

  var btn = document.createElement("Button");
  btn.innerHTML = "X";
  btn.id = "cross";
  btn.onclick = function () {
    remove(this);
  };

  var select = document.createElement("select");
  select.name = "move";
  select.id = "move";

  var opt1 = document.createElement("option");
  opt1.value = option1;
  opt1.innerHTML = option1;

  var opt2 = document.createElement("option");
  opt2.value = option2;
  opt2.innerHTML = option2;

  select.appendChild(opt1);
  select.appendChild(opt2);

  var moveBtn = document.createElement("Button");
  moveBtn.innerHTML = "move";
  moveBtn.id = "moveBtn";
  moveBtn.onclick = function () {
    moveTo(this);
  };

  var container = document.createElement("div");
  container.className = "container";

  var card = document.createElement("div");
  card.className = "card";

  container.appendChild(btn);
  container.appendChild(p);
  container.appendChild(select);
  container.appendChild(moveBtn);
  card.appendChild(container);

  document.getElementById("content " + addTo).appendChild(card);
}

function remove(btn) {
  btn.closest(".card").remove();
}

function moveTo(btn) {
  var value = btn.closest(".container").querySelector("select").value;

  var card = btn.closest(".container").parentElement;

  var origin = btn.closest(".container").parentElement.parentElement.id;
  console.log(origin);

  if (origin.includes("todo")) {
    origin = "todo";
  } else if (origin.includes("doing")) {
    origin = "doing";
  } else if (origin.includes("done")) {
    origin = "done";
  }

  card.remove();

  var select = card.querySelector("#move");

  if (value === "todo") {
    handleSelect(select, "todo", origin);
    document.getElementById("content todo").appendChild(card);
  } else if (value === "doing") {
    handleSelect(select, "doing", origin);
    document.getElementById("content doing").appendChild(card);
  } else if (value === "done") {
    handleSelect(select, "done", origin);
    document.getElementById("content done").appendChild(card);
  }
}

function handleSelect(select, remove, add) {
  if (select.options[0].value === remove) {
    select.options[0].remove();
    var option = document.createElement("option");
    option.innerHTML = add;
    option.value = add;
    select.add(option);
  }
}
