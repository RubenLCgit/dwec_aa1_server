document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data));

  //SHOW CATEGORIES

  let showCategories = (data) => {
    data.forEach((category) => {
      let parent = document.getElementsByTagName("ul")[0];
      let child = document.createElement("li");
      let child2 = document.createElement("a");
      child2.href = "index.html";
      child.className = "list-group-item";
      child.appendChild(child2);
      parent.appendChild(child);
      child2.textContent = category.name;
    });
  };

  //ADD CATEGORY

  const buttonAddCategory = document.getElementById("button-category-add");
  buttonAddCategory.addEventListener("click", function () {
    let nameCategory;
    do {
      nameCategory = prompt("Enter a category name", "");
      if (nameCategory === null) {
        alert("Operation canceled by user.");
        break;
      }
      if (nameCategory.trim() === "") {
        alert("Please enter a valid name.");
      }
    } while (nameCategory === null || nameCategory.trim() === "");
    addCategory(nameCategory);
  });

  let addCategory = (name) => {
    const nameCategory = {
      name: name,
    };
    fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(nameCategory),
    })
      .then((res) => res.json())
      .then((data) => showCategories(data));
    location.reload();
  };
});
