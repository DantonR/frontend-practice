const d = document;
const w = window;
const m = document.querySelector("main");
const b = document.querySelector("body");

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

//usage:
readTextFile("./MOCK_DATA.json", function (text) {
  var data = JSON.parse(text);
  _200620(data);
});

function _200620(data) {
  let firstTen = data.slice(0, 18);
  firstTen.forEach((element) => {
    element.id = Math.floor(Math.random() * Math.floor(10));
  });

  let sorted = firstTen.sort((a, b) => (a.id > b.id ? 1 : -1));

  sorted = firstTen.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));

  function createColourPicker() {
    let colourPicker = d.createElement("input");
    colourPicker.type = "color";
    colourPicker.className = "colour-picker";
    colourPicker.id = "colourPicker";
    m.appendChild(colourPicker);
  }

  function createNumberSlider() {
    let slider = d.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "360";
    slider.addEventListener("input", handlerSliderInput);
    m.prepend(slider);
  }
  createNumberSlider();
  let style = document.documentElement.style;
  let style2 = document.styleSheets[1].cssRules[0].style;

  function handlerSliderInput(e) {
    style.setProperty("--hueBasic", e.target.value);
  }

  let table = d.createElement("table");
  table.className = "custom-table";
  m.appendChild(table);

  let keys = Object.keys(sorted[0]);
  keys = keys.splice(1, 4);

  keys.forEach((e) => {
    let th = d.createElement("th");
    th.className = "custom-table__th";

    th.innerHTML = e;
    table.appendChild(th);
  });

  sorted.forEach((element) => {
    let tr = d.createElement("tr");
    tr.className = "custom-table__r";
    table.appendChild(tr);

    createTd(element.first_name, tr);
    createTd(element.last_name, tr);
    createTd(element.email, tr);
    createTd(element.gender, tr);
  });

  function createTd(name, tr) {
    let rows = d.querySelectorAll(".custom-table__r");
    let td = d.createElement("td");
    td.className = "custom-table__d";
    td.innerHTML = name;
    tr.appendChild(td);
  }
}
