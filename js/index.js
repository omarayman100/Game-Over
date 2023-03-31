var id;
var response1;
var _category = "shooter";
async function getGame() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "73e64e3545msh2d4328616dd87cfp1a4b2ejsn1809bd17b763",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${_category}`,
    options
  );

  const response = await api.json();

  var temp = "";

  for (let i = 0; i < response.length; i++) {
    const element = response[i];
    temp += `
    <div id="${element.id}" class="col-md-6 col-xl-3 col-lg-4 card0 pointer mt-4 ">
            <div id="${element.id}" class="p-3 border border-2 border-bottom-0 border-dark">
              <div class="">
                <img id="${element.id}" class="w-100 rounded-3" src="${element.thumbnail}" alt="" />
              </div>
              <div id="${element.id}" class="d-flex justify-content-between mt-2">
                <span>${element.title}</span>
                <button class="btn btn-success">free</button>
              </div>
              <div id="${element.id}" class="text-center text-white-50" id="description">
                <p id="${element.id}">${element.short_description}</p>
              </div>
            </div>
            <div id="${element.id}"
              class="border p-2 border-2 border-dark d-flex justify-content-between"
            >
              <span id="${element.id}"
                class="border border-1 rounded-pill border-dark px-1 bg-gradient btn-dark text-white-50"
                >${element.genre}</span
              >
              <span
                class="border border-1 rounded-pill border-dark px-1 bg-gradient text-white-50 windows"
                >${element.platform}</span
              >
            </div>
          </div>
    `;
  }
  document.getElementById("temp").innerHTML = temp;

  $(".card0").click(function (e) {
    // e.preventDefault();

    id = $(e.target).attr("id");

    $(".Details-Game").removeClass("d-none");
    $(".hambozo").addClass("d-none");
    getgamedata();
  });
}

async function getgamedata() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "73e64e3545msh2d4328616dd87cfp1a4b2ejsn1809bd17b763",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );

  response1 = await api.json();
  console.log(response1);
  document.querySelector(".Details-Game").innerHTML = `<div class="container">
        <h2 class="mb-4">Details Game</h2>
        <i class="fa-solid fa-xmark position-absolute close-btn pointer"></i>
        <div class="row">
          <div class="col-md-4">
            <img
              class="Details-Game-img w-100"
              src="${response1.thumbnail}"
              alt=""
            />
          </div>
          <div class="col-md-8">
            <h4>Title: <span class="game-title">${response1.title}</span></h4>
            <h6>
              Category:
              <span
                class="border border-1 rounded-3 border-dark px-1 bg-success text-dark"
                >${response1.genre}</span
              >
            </h6>
            <h6>
              Platform:
              <span
                class="border border-1 rounded-3 border-dark px-1 bg-success text-dark"
                >${response1.platform}</span
              >
            </h6>
            <h6>
              Status:
              <span
                class="border border-1 rounded-3 border-dark px-1 bg-success text-dark"
                >${response1.status}</span
              >
            </h6>
            <p>${response1.description}
            </p>
            <a href="${response1.game_url}" target="_blank"><button class="btn btn-outline-warning text-white">
              Show Game
            </button></a>
          </div>
        </div>
      </div>`;
  $(".fa-xmark").click(function (e) {
    // e.preventDefault();
    $(".hambozo").removeClass("d-none");
    $(".Details-Game").addClass("d-none");
  });
}

getGame();

$(".nav-link").click(function (e) {
  console.log(e.target.innerHTML.toLowerCase());
  e.target.innerHTML.toLowerCase();
  _category = e.target.innerHTML.toLowerCase();
  var clickeda = e.target;
  $(".nav-link").addClass("active");
  $(".nav-link").removeClass("active").not(clickeda);

  getGame();
});

$(document).scroll(() => {
  if ($(document).scrollTop() > $(".navbar").offset().top) {
    $(".navbar").css("position", "fixed");
    $(".navbar").css("top", "0px");
    $(".navbar").css("left", "12.5%");
  } else if ($(document).scrollTop() < 170) {
    $(".navbar").css("position", "absolute");
    $(".navbar").css("top", "170px");
    $(".navbar").css("left", "12.5%");
  }
});
