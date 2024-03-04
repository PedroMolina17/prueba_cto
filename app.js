document.addEventListener("DOMContentLoaded", function () {
  const addItemForm = document.getElementById("addItemForm");
  const shoppingList = document.getElementById("shoppingList");
  const clearListButton = document.getElementById("clearList");
  let items = loadFromLocalStorage();

  renderList();
  updateItemCount();
  addItemForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newItemInput = document.getElementById("item");
    const newItemValue = newItemInput.value.trim();

    if (newItemValue !== "") {
      addItem(newItemValue);
      newItemInput.value = "";
    }
  });
  function updateItemCount() {
    const itemCountContainer = document.getElementById("itemCount");
    itemCountContainer.textContent = items.length;
  }
  clearListButton.addEventListener("click", function () {
    clearList();
    updateItemCount();
  });

  function addItem(item) {
    items.push({ name: item, completed: false });
    renderList();
    saveToLocalStorage();
    updateItemCount();
  }

  function clearList() {
    items.length = 0;
    renderList();
    saveToLocalStorage();
    updateItemCount();
  }

  function removeItem(index) {
    items.splice(index, 1);
    renderList();
    saveToLocalStorage();
    updateItemCount();
  }

  function toggleItem(index) {
    items[index].completed = !items[index].completed;
    renderList();
    saveToLocalStorage();
  }

  function renderList() {
    shoppingList.innerHTML = "";
    items.forEach(function (item, index) {
      const li = document.createElement("li");
      li.textContent = item.name;

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

      deleteButton.addEventListener("click", function (event) {
        event.stopPropagation();
        removeItem(index);
      });

      li.appendChild(deleteButton);

      li.className = item.completed ? "completed" : "";
      li.addEventListener("click", function () {
        toggleItem(index);
      });

      shoppingList.appendChild(li);
    });
  }

  function loadFromLocalStorage() {
    const storedItems = localStorage.getItem("shoppingListItems");
    return storedItems ? JSON.parse(storedItems) : [];
  }

  function saveToLocalStorage() {
    localStorage.setItem("shoppingListItems", JSON.stringify(items));
  }
});
