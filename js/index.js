(function () {
  let mainDataSet = [];
  let tableElem;
  let firstDataSet = following;
  let secondDataSet = followers;

  document.addEventListener("DOMContentLoaded", function (event) {
    tableElem = document.querySelector("#app table");

    const searchButton = document.querySelector("#app button#search_btn");
    searchButton.addEventListener("click", searchByText);

    const clearButton = document.querySelector("#app button#clear_btn");
    clearButton.addEventListener("click", clearSearch);

    const searchInput = document.querySelector("#app input#search_text");
    searchInput.addEventListener("keyup", clearSearch2);

    initDataSet();
    processDataSet();
  });

  function clearSearch() {
    const searchInput = document.querySelector("#app input#search_text");

    searchInput.value = "";
    searchByText();
  }

  function clearSearch2() {
    const searchInput = document.querySelector("#app input#search_text");
    initDataSet();
    searchByText();
  }

  function searchByText() {
    const searchInput = document.querySelector("#app input#search_text");
    clearTable();
    mainDataSet = mainDataSet.filter(
      (x) =>
        x.nick_name.includes(searchInput.value) ||
        x.name.includes(searchInput.value)
    );
    processDataSet();
  }

  function clearTable() {
    tableElem.querySelectorAll("tr.body-row").forEach(function (e) {
      e.remove();
    });
  }

  function initDataSet() {
    mainDataSet = [];
    const both = _.intersectionBy(firstDataSet, secondDataSet, "nick_name");

    both.forEach((x) => {
      mainDataSet.push({
        avatar: x.avatar,
        nick_name: x.nick_name,
        name: x.name,
        follower: true,
        following: true,
      });
    });

    const following = _.differenceBy(firstDataSet, both, "nick_name");
    following.forEach((x) => {
      mainDataSet.push({
        avatar: x.avatar,
        nick_name: x.nick_name,
        name: x.name,
        follower: false,
        following: true,
      });
    });

    const followers = _.differenceBy(secondDataSet, both, "nick_name");
    followers.forEach((x) => {
      mainDataSet.push({
        avatar: x.avatar,
        nick_name: x.nick_name,
        name: x.name,
        follower: false,
        following: true,
      });
    });
  }

  function processDataSet() {
    mainDataSet.forEach((f, idx) => {
      const row = document.createElement("tr");
      row.classList.add("body-row");

      const cellNumber = document.createElement("td");
      cellNumber.innerText = ++idx;

      const cellAvatar = document.createElement("td");
      cellAvatar.innerHTML = `<img src="${f.avatar}" alt="${f.nick_name}"/>`;

      const cellNick = document.createElement("td");
      cellNick.innerHTML = `<a href="https://tiktok.com${f.nick_name}">${f.nick_name}</a>`;

      const cellName = document.createElement("td");
      cellName.innerText = f.name;

      const cellFollower = document.createElement("td");
      cellFollower.innerText = f.follower ? "Tak" : "Nie";

      const cellFollowing = document.createElement("td");
      cellFollowing.innerText = f.following ? "Tak" : "Nie";

      row.appendChild(cellNumber);
      row.appendChild(cellAvatar);
      row.appendChild(cellNick);
      row.appendChild(cellName);
      row.appendChild(cellFollower);
      row.appendChild(cellFollowing);

      tableElem.appendChild(row);
    });
  }
})();
