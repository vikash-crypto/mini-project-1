// Inventory Array
let inventory = [];

// DOM Elements
const itemNameInput = document.getElementById('item-name');
const itemCategoryInput = document.getElementById('item-category');
const itemQuantityInput = document.getElementById('item-quantity');
const itemPriceInput = document.getElementById('item-price');
const inventoryList = document.getElementById('inventory-list');
const inventoryTotal = document.getElementById('inventory-total');

document.getElementById('add-item-btn').addEventListener('click', addItem);
document.getElementById('clear-form-btn').addEventListener('click', clearForm);

// Add Item Function
function addItem() {
  const itemName = itemNameInput.value.trim();
  const itemCategory = itemCategoryInput.value;
  const itemQuantity = parseInt(itemQuantityInput.value);
  const itemPrice = parseFloat(itemPriceInput.value);

  if (!itemName || !itemCategory || isNaN(itemQuantity) || isNaN(itemPrice) || itemQuantity <= 0 || itemPrice <= 0) {
    alert('Please fill in all fields with valid values.');
    return;
  }

  const newItem = {
    id: Date.now(),
    name: itemName,
    category: itemCategory,
    quantity: itemQuantity,
    price: itemPrice,
  };

  inventory.push(newItem);
  updateTable();
  clearForm();
}

// Update Table
function updateTable() {
  inventoryList.innerHTML = '';
  let totalValue = 0;

  inventory.forEach((item) => {
    const totalItemValue = (item.quantity * item.price).toFixed(2);
    totalValue += parseFloat(totalItemValue);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${totalItemValue}</td>
      <td>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </td>
    `;
    inventoryList.appendChild(row);
  });

  inventoryTotal.textContent = totalValue.toFixed(2);
}

// Delete Item
function deleteItem(id) {
  inventory = inventory.filter(item => item.id !== id);
  updateTable();
}

// Clear Form
function clearForm() {
  itemNameInput.value = '';
  itemCategoryInput.value = '';
  itemQuantityInput.value = '';
  itemPriceInput.value = '';
}