document.addEventListener("DOMContentLoaded", function () {
  //SHOW CATEGORIES

  let showCategories = (data) => {
    data.forEach((category) => {
      let parent = document.getElementById("list-categories");
      let child = document.createElement("li");
      child.className = "list-group-item link-category";
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
    .then((data) => showCategories(data))
    .catch((error) => {
      alert("Error adding category");
      console.error("Error adding category:", error.message);
    });

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
      .then(() => location.reload())
      .catch((error) => {
        alert("Error adding category :" + error.message);
        console.error("Error adding category:", error);
      });
  };

  //SHOW SITES

  let idAddCategory;
  const linkCategory = document.getElementsByClassName(
    "main-screen-user-interface__list-categories"
  )[0];
  linkCategory.addEventListener("click", function (event) {
    if (event.target.matches(".link-group-item")) {
      event.preventDefault();
      idAddCategory = event.target.id;
      const urlCategory =
        "http://localhost:3000/categories" + "/" + idAddCategory;
      fetch(urlCategory)
        .then((res2) => res2.json())
        .then((data2) => showSites(data2.sites))
        .catch((error) => {
          alert("Error loading sites");
          console.error("Error adding category sites:", error.message);
        });
    }
  });

  let showSites = (sites) => {
    let selectedCategory = document.getElementById(idAddCategory).parentElement;
    let allCategories = document.getElementsByClassName("link-category");
    [...allCategories].forEach((element) => {
      element.style.backgroundColor = "rgba(114, 180, 133, 0.219)";
    });
    selectedCategory.style.backgroundColor = "#6666877a";
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
      child2.className = "list-group-item";
      child2.textContent = site.name;
      child.appendChild(child2);
      let child3 = document.createElement("li");
      child3.className = "list-group-item";
      let linkUrl = document.createElement("a");
      linkUrl.href = site.url;
      linkUrl.textContent = site.url;
      child.appendChild(child3);
      child3.appendChild(linkUrl);
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
      let textDescript = document.createElement("p");
      textDescript.textContent = site.description;
      child.appendChild(child6);
      child6.appendChild(textDescript);
    });
  };

  //DELETE CATEGORY

  const buttonDeleteCategory = document.getElementById(
    "button-category-delete"
  );
  buttonDeleteCategory.addEventListener("click", function () {
    let allCategories = document.getElementsByClassName("link-category");
    let idDeleteCategory;
    [...allCategories].forEach((element) => {
      if (element.style.backgroundColor == "rgba(102, 102, 135, 0.48)") {
        idDeleteCategory = element.children[0].id;
      }
    });
    deleteCategory(idDeleteCategory);
  });

  let deleteCategory = (id) => {
    if (id) {
      let endPointCategory = "http://localhost:3000/categories/" + id;
      fetch(endPointCategory, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          alert("Error deleting category: ");
          console.error("Error deleting category:", error.message);
        });
    } else {
      alert("You must select a category to delete it");
    }
  };

  //ADD SITE

  const buttonAddSite = document.getElementsByClassName(
    "main-screen-user-interface__link-site"
  )[0];
  buttonAddSite.addEventListener("click", function (event) {
    let allCategories = document.getElementsByClassName("link-category");
    let idSiteCategory;
    [...allCategories].forEach((element) => {
      if (element.style.backgroundColor == "rgba(102, 102, 135, 0.48)") {
        idSiteCategory = element.children[0].id;
      }
    });
    if (idAddCategory) {
      buttonAddSite.href = "sites.html?idCategory=" + idSiteCategory;
    } else {
      alert("You must select a category");
    }
  });
});
