document.addEventListener("DOMContentLoaded", function () {
  const url = window.location.href;
  const urlParams = new URLSearchParams(new URL(url).search);
  const idCategory = urlParams.get("idCategory");

  function checkImputs() {
    if (
      document.getElementById("inputName").value &&
      document.getElementById("inputPassword6").value &&
      document.getElementById("inputNameUser").value
    ) {
      document.getElementById("saveButton").disabled = false;
    } else {
      document.getElementById("saveButton").disabled = true;
    }
  }

  document.getElementById("inputName").addEventListener("keyup", checkImputs);
  document
    .getElementById("inputPassword6")
    .addEventListener("keyup", checkImputs);
  document
    .getElementById("inputNameUser")
    .addEventListener("keyup", checkImputs);

  const formSite = document.getElementById("form_site");
  formSite.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameSite = document.getElementById("inputName").value;
    const urlSite = document.getElementById("basic-url").value;
    const userSite = document.getElementById("inputNameUser").value;
    const passwordSite = document.getElementById("inputPassword6").value;
    const textAreaSite = document.getElementById("ControlTextarea1").value;

    const newSite = {
      name: nameSite,
      url: urlSite,
      user: userSite,
      password: passwordSite,
      description: textAreaSite,
    };
    fetch("http://localhost:3000/categories/" + idCategory, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newSite),
    })
      .then(() => {
        window.location.href = "index.html";
        alert("Site added");
      })
      .catch((error) => {
        alert("Error adding site.");
        console.error("Error adding site: " + error.message);
      });
  });
});
