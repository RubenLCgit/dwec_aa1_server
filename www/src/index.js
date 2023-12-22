document.addEventListener("DOMContentLoaded", function () {
  //SHOW CATEGORIES

  let showCategories = (data) => {
    data.forEach((category) => {
      let parent = document.getElementById("list-categories");
      let child = document.createElement("li");
      child.className = "list-group-item";
      parent.appendChild(child);
      let child2 = document.createElement("a");
      child2.href = "index.html";
      child2.className = "link-group-item";
      child2.setAttribute("id", category.id);
      child.appendChild(child2);
      child2.textContent = category.name;
    });
  };

  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data));

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
    if (nameCategory !== null && nameCategory.trim() !== "") {
      addCategory(nameCategory);
    }
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

  //SHOW SITES

  let idCategory;
  const linkCategory = document.getElementsByClassName(
    "main-screen-user-interface__list-categories"
  )[0];
  linkCategory.addEventListener("click", function (event) {
    if (event.target.matches(".link-group-item")) {
      event.preventDefault();
      idCategory = event.target.id;
      const urlCategory = "http://localhost:3000/categories" + "/" + idCategory;
      fetch(urlCategory)
        .then((res) => res.json())
        .then((data2) => showSites(data2.sites));
    }
  });

  let showSites = (sites) => {
    let parent = document.getElementsByClassName(
      "main-screen-user-interface__list-sites"
    )[0];
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    sites.forEach((site) => {
      let child = document.createElement("ul");
      child.className = "list-group list-group-horizontal";
      parent.appendChild(child);
      let child2 = document.createElement("li");
      child2.className = "list-group-item  description-scroll";
      child2.textContent = site.name;
      child.appendChild(child2);
      let child3 = document.createElement("li");
      child3.className = "list-group-item";
      child3.textContent = site.url;
      child.appendChild(child3);
      let child4 = document.createElement("li");
      child4.className = "list-group-item";
      child4.textContent = site.user;
      child.appendChild(child4);
      let child5 = document.createElement("li");
      child5.className = "list-group-item";
      child5.textContent = site.password;
      child.appendChild(child5);
      let child6 = document.createElement("li");
      child6.className = "list-group-item description-scroll";
      child6.textContent = site.description;
      child.appendChild(child6);
    });
  };
});
