import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettingdbAddress = {
  databaseURL: "https://playground-c5b20-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettingdbAddress);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputEl = document.getElementById("input-el");
const addElBtn = document.getElementById("add-el");
const shoppingListEl = document.getElementById("list-el");

addElBtn.addEventListener("click", function () {
  const inputElByUser = inputEl.value;
  push(shoppingListInDB, inputElByUser);
  emptyInputAfterAdding();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let snapValue = Object.entries(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < snapValue.length; i++) {
      let currentItem = snapValue[i];
      let currentItemID = snapValue[0];
      let currentItemValue = snapValue[1];

      addingItemToShoppingList(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here...";
  }
});

function emptyInputAfterAdding() {
  inputEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function addingItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });
  shoppingListEl.append(newEl);
}
