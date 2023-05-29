var data = [
    { name: "Jesus-Rainer", image: "item1.jpg" },
    { name: "Sitting-Rainer", image: "item2.jpg" },
    { name: "Pixel-Rainer", image: "item3.jpg" },
    { name: "Law-Rainer", image: "item4.jpg" },
    { name: "Axe-Rainer", image: "item5.jpg" }
  ];
  
  var inventory = [];
  document.addEventListener("DOMContentLoaded", function() {
    var randomButton = document.getElementById("randomButton");
    var displayContainer = document.getElementById("displayContainer");
    var displayElement = document.getElementById("displayElement");
    var imageElement = document.getElementById("itemImage");
    var inventoryElement = document.getElementById("inventory");
    var buttonCooldown = false;
  
    randomButton.addEventListener("click", function() {
      if (!buttonCooldown) {
        buttonCooldown = true;
        randomButton.disabled = true;
  
        var randomIndex = Math.floor(Math.random() * data.length);
        var randomItem = data[randomIndex];
  
        inventory.push(randomItem);
  
        displayElement.textContent = randomItem.name;
        imageElement.src = "itemimg/" + randomItem.image;
  
        displayContainer.classList.add("fade-out");
  
        setTimeout(function() {
          renderInventory();
          buttonCooldown = false;
          randomButton.disabled = false;
          displayContainer.classList.remove("fade-out");
        }, 2000); 
  
        randomButton.classList.add("cooldown");
  
        setTimeout(function() {
          randomButton.classList.remove("cooldown");
        }, 3000); 
      }
    });
  
    function renderInventory() {
      inventoryElement.innerHTML = "";
  
      for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];
        var itemBox = document.createElement("div");
        itemBox.className = "itemBox";
  
        var itemImage = document.createElement("img");
        itemImage.className = "itemImage";
        itemImage.src = "itemimg/" + item.image;
        itemImage.alt = "Item Image";
  
        var itemName = document.createElement("p");
        itemName.textContent = item.name;
  
        itemBox.appendChild(itemImage);
        itemBox.appendChild(itemName);
        inventoryElement.appendChild(itemBox);
      }
    }
  });
  