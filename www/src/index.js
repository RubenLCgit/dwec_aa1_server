document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((data) => drawData(data));

  let drawData = (data) => {
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
});
