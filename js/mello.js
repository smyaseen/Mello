if (!document.cookie) window.location.href = "../pages/login.html";

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var activeCloseButton;
var optionElementList = ["todo", "doing", "done"];

document.querySelector(".welcome").innerHTML =
  "Welcome " + document.cookie.split(",")[0].split("=")[1];

addOptionsToSelect(document.getElementById("addTo"));

function addOptionsToSelect(selectElement, addToSection) {
  console.log(selectElement);
  for (let index = 0; index < optionElementList.length; index++) {
    if (optionElementList[index] === addToSection) continue;

    var option = createHTMLElement(
      "option",
      "",
      "",
      optionElementList[index],
      optionElementList[index]
    );
    selectElement.appendChild(option);
  }
}

function createHTMLElement(
  elementTagName,
  elementID,
  elementClassName,
  elementValue,
  elementInnerHTML
) {
  var element = document.createElement(elementTagName);

  if (elementID) {
    element.id = elementID;
  }

  if (elementClassName) {
    element.className = elementClassName;
  }

  if (elementValue) {
    element.value = elementValue;
  }

  if (elementInnerHTML) {
    element.innerHTML = elementInnerHTML;
  }

  return element;
}

function createCard() {
  if (!document.getElementById("inpText").value) return;

  var addToSection = document.getElementById("addTo").value;

  var taskText = createHTMLElement(
    "p",
    "",
    "",
    "",
    document.getElementById("inpText").value
  );

  var deleteButton = createHTMLElement("button", "cross", "", "", "X");

  deleteButton.onclick = function () {
    showModal(this);
  };

  var moveSelect = createHTMLElement("select", "move", "", "", "");
  addOptionsToSelect(moveSelect, addToSection);

  var moveBtn = createHTMLElement("button", "moveBtn", "", "", "move");
  moveBtn.onclick = function () {
    moveTo(this);
  };

  var container = createHTMLElement("div", "", "container", "", "");

  var cardDiv = createHTMLElement("div", "", "card", "", "");

  container.appendChild(deleteButton);
  container.appendChild(taskText);
  container.appendChild(moveSelect);
  container.appendChild(moveBtn);
  cardDiv.appendChild(container);

  document.getElementById("content " + addToSection).appendChild(cardDiv);
}

function showModal(btn) {
  modal.style.display = "block";
  activeCloseButton = btn;
}

document.getElementById("yes").onclick = function () {
  modal.style.display = "none";
  activeCloseButton.closest(".card").remove();
};

document.getElementById("no").onclick = function () {
  modal.style.display = "none";
};

function moveTo(btn) {
  var value = btn.closest(".container").querySelector("select").value;

  var card = btn.closest(".container").parentElement;

  var origin = btn.closest(".container").parentElement.parentElement.id;

  for (let index = 0; index < optionElementList.length; index++) {
    if (origin.includes(optionElementList[index])) {
      origin = optionElementList[index];
    }
  }

  card.remove();
  //CHANGE FROM HERE
  var select = card.querySelector("#move");

  if (value === "todo") {
    handleMoveSelectOptionsWhenMoved(select, "todo", origin);
    document.getElementById("content todo").appendChild(card);
  } else if (value === "doing") {
    handleMoveSelectOptionsWhenMoved(select, "doing", origin);
    document.getElementById("content doing").appendChild(card);
  } else if (value === "done") {
    console.log(origin);
    handleMoveSelectOptionsWhenMoved(select, "done", origin);
    document.getElementById("content done").appendChild(card);
  }
}

function handleMoveSelectOptionsWhenMoved(
  selectElement,
  removeOption,
  addOption
) {
  var optionToRemove;

  if (selectElement.options[0].value === removeOption) {
    optionToRemove = selectElement.options[0];
  } else {
    optionToRemove = selectElement.options[1];
  }

  optionToRemove.remove();

  var option = createHTMLElement("option", "", "", addOption, addOption);

  selectElement.add(option);
}

function logout() {
  document.cookie = "name=,userID=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  window.location.href = "";
}
