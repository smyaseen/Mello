if (!document.cookie) window.location.href = "../pages/login.html";

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var activeCloseButton;
var optionElementList = ["todo", "doing", "done", "anything"];
var userID = document.cookie.split(",")[1].split("=")[1];
var userName = document.cookie.split(",")[0].split("=")[1];
var cards = [];
var cardID = 0;
var allCards = [];

document.querySelector(".welcome").innerHTML = "Welcome " + userName;

addOptionsToSelect(document.getElementById("addTo"));

function getAPIAndParseJSON() {
  let url =
    "https://b3f2e9d6-d881-4841-921d-22f2c043fdcd.mock.pstmn.io/v1/cards";

  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      for (var i = 0; i < out.length; i++) {
        if (out[i].userID === userID) {
          cards.push({
            cardID: out[i].cardID,
            task: out[i].task,
            section: out[i].section,
          });
        }
      }
      loadData();
    })
    .catch((err) => {
      throw err;
    });
}

getAPIAndParseJSON();

function addOptionsToSelect(selectElement, addToSection) {
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

function makeEachSectionDiv() {
  var mainDiv = document.querySelector(".main");

  for (let index = 0; index < optionElementList.length; index++) {
    var sectionsDiv = createHTMLElement(
      "div",
      optionElementList[index],
      "section",
      "",
      ""
    );

    var h1 = createHTMLElement(
      "h1",
      "",
      optionElementList[index] + " heading",
      "",
      optionElementList[index].charAt(0).toUpperCase() +
        optionElementList[index].substring(1)
    );

    var contentDiv = createHTMLElement(
      "div",
      "content " + optionElementList[index],
      "",
      "",
      ""
    );

    sectionsDiv.appendChild(h1);
    sectionsDiv.appendChild(contentDiv);

    mainDiv.appendChild(sectionsDiv);
  }
}

makeEachSectionDiv();

document.querySelectorAll("h1")[
  document.querySelectorAll("h1").length - 1
].style.borderRight = "0px";

function loadData() {
  for (let index = 0; index < cards.length; index++) {
    if (cards[index].cardID > cardID) cardID = cards[index].cardID;

    createCard(cards[index].task, cards[index].section, cards[index].cardID);
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

function handleArrows(section) {
  if (section.children.length === 1) return;

  for (let index = 0; index < section.children.length; index++) {
    if (!section.children[index].firstChild.querySelector(".downArrow")) {
      section.children[index].firstChild.appendChild(createDownArrow());
    }

    if (!section.children[index].firstChild.querySelector(".upArrow")) {
      section.children[index].firstChild.appendChild(createUpArrow());
    }
  }

  if (section.firstChild.firstChild.querySelector(".upArrow")) {
    section.firstChild.firstChild.querySelector(".upArrow").remove();
  }

  if (section.lastChild.firstChild.querySelector(".downArrow")) {
    section.lastChild.firstChild.querySelector(".downArrow").remove();
  }
}

function createDownArrow() {
  downArrow = createHTMLElement("button", "", "downArrow", "", "↓");
  downArrow.onclick = function () {
    event.stopPropagation();
    moveDown(this);
  };

  return downArrow;
}

function createUpArrow() {
  upArrow = createHTMLElement("button", "", "upArrow", "", "↑");

  upArrow.onclick = function () {
    event.stopPropagation();
    moveUp(this);
  };

  return upArrow;
}

function createCard(taskValue, sectionToAddTo, giveCardID) {
  if (!document.getElementById("inpText").value) {
    if (!taskValue && !sectionToAddTo) return;
  }

  var addToSection;

  if (sectionToAddTo) {
    addToSection = sectionToAddTo;
  } else {
    addToSection = document.getElementById("addTo").value;
  }

  var taskText = createHTMLElement(
    "p",
    "",
    "",
    "",
    taskValue ? taskValue : document.getElementById("inpText").value
  );

  var deleteButton = createHTMLElement("button", "cross", "", "", "X");

  deleteButton.onclick = function () {
    event.stopPropagation();
    showModal(this);
  };

  var moveSelect = createHTMLElement("select", "move", "", "", "");

  moveSelect.onclick = function () {
    event.stopPropagation();
  };

  addOptionsToSelect(moveSelect, addToSection);

  var moveBtn = createHTMLElement("button", "moveBtn", "", "", "move");
  moveBtn.onclick = function () {
    event.stopPropagation();

    moveTo(this);
  };

  var container = createHTMLElement("div", "", "container", "", "");

  var cardIDKey;

  if (giveCardID) {
    cardIDKey = giveCardID;
  } else {
    cardID++;
    cardIDKey = cardID;
  }

  var cardDiv = createHTMLElement("div", cardIDKey, "card", "", "");

  container.appendChild(deleteButton);
  container.appendChild(taskText);
  container.appendChild(moveSelect);
  container.appendChild(moveBtn);
  cardDiv.appendChild(container);

  cardDiv.onclick = function () {
    event.stopPropagation();
    showDetailModal(this);
  };

  allCards.push({
    id: cardIDKey,
    text: taskText.innerHTML,
    createdAt: getCurrentDateAndTime(),
    createdBy: userName,
  });

  document.getElementById("content " + addToSection).appendChild(cardDiv);

  handleArrows(document.getElementById("content " + addToSection));
}

function getCurrentDateAndTime() {
  var currentdate = new Date();
  var datetime =
    currentdate.getMonth() +
    1 +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  return datetime;
}

function moveUp(btn) {
  var currentCard = btn.closest(".card");
  if (currentCard.previousSibling) {
    currentCard.parentNode.insertBefore(
      currentCard,
      currentCard.previousSibling
    );
  }
  handleArrows(currentCard.parentNode, currentCard);
}

function showAddModal() {
  document.getElementById("addModal").style.display = "block";
}

function hideAddModal() {
  document.getElementById("addModal").style.display = "none";
}

function moveDown(btn) {
  var currentCard = btn.closest(".card");
  if (currentCard.nextSibling) {
    currentCard.parentNode.insertBefore(currentCard.nextSibling, currentCard);
  }

  handleArrows(currentCard.parentNode, currentCard);
}

function showModal(btn) {
  modal.style.display = "block";
  activeCloseButton = document.getElementById(btn.closest(".card").id);
}

function showDetailModal(btn) {
  var card = btn.closest(".card");

  var ul = createHTMLElement("ul", "", "detailList", "", "");
  var detailCard;
  for (let index = 0; index < allCards.length; index++) {
    if (allCards[index].id == card.id) {
      detailCard = allCards[index];
      break;
    }
  }

  if (!detailCard) return;

  for (let index = 0; index < Object.keys(detailCard).length; index++) {
    var li = createHTMLElement(
      "li",
      "",
      "",
      "",
      Object.keys(detailCard)[index] +
        ": " +
        detailCard[Object.keys(detailCard)[index]]
    );
    ul.appendChild(li);
  }
  document.querySelector(".detail-modal-content").appendChild(ul);

  document.getElementById("detailModal").style.display = "block";
}

function hideDetailModal() {
  if (document.querySelector(".detail-modal-content").children[1]) {
    document.querySelector(".detail-modal-content").children[1].remove();
  }
  document.getElementById("detailModal").style.display = "none";
}

document.getElementById("yes").onclick = function () {
  modal.style.display = "none";
  activeCloseButton.remove();
};

document.getElementById("no").onclick = function () {
  modal.style.display = "none";
};

function moveTo(btn) {
  var value = btn.closest(".container").querySelector("select").value;

  var card = btn.closest(".container").parentElement;

  var origin = btn
    .closest(".container")
    .parentElement.parentElement.id.split(" ")[1];

  card.remove();

  var select = card.querySelector("#move");

  handleMoveSelectOptionsWhenMoved(select, value, origin);
  document.getElementById("content " + value).appendChild(card);
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
