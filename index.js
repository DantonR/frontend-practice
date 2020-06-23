import { myFunction } from "./200622_flexbox.js";

const global = {
  d: document,
  w: window,
  m: document.querySelector("main"),
  b: document.querySelector("body"),
};

console.dir(localStorage);
let testArray = [1, 2, 3, 4];
localStorage.setItem("array", testArray);

document.documentElement.style.setProperty("--hueBasic", localStorage.hueBasic);
document.documentElement.style.setProperty(
  "--baseSaturation",
  localStorage.baseSaturation
);
document.documentElement.style.setProperty(
  "--mainWidth",
  localStorage.mainWidth
);

function changeColour(e) {
  let prop = this.dataset.prop;
  let suffix = this.dataset.suffix;
  suffix == "undefined" ? (suffix = "") : null;

  document.documentElement.style.setProperty(
    this.dataset.prop,
    e.target.value + suffix
  );

  let newProp = prop.replace("--", "");
  localStorage.setItem(newProp, e.target.value + suffix);
}

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

function linkToCss() {
  var head = document.getElementsByTagName("HEAD")[0];
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "200622_flexbox.css";
  head.appendChild(link);
}

linkToCss();

function createSlider(label, labelName, className, dataProp, max, suffix) {
  let keyName = dataProp.replace("--", "");
  let keyValue = localStorage.getItem(keyName);
  keyValue = keyValue.replace("%", "");
  keyValue = keyValue.replace("px", "");

  let slider = `<label for='${labelName}'>${label}</label><br/>`;
  slider += `<input class='custom-slider ${className}' data-prop=${dataProp} data-suffix=${suffix} type='range' max=${max} name=${labelName} value="${keyValue}"/>`;
  return slider;
}

function createStyleController() {
  let accordion = document.createElement("button");
  accordion.className = "accordion";
  let icons = "<div class='accordion-icon-container'>";
  icons += "<div class='accordion-icon icon-1'></div>";
  icons += "<div class='accordion-icon icon-2'></div>";
  icons += "</div>";
  accordion.innerHTML = icons;
  global.m.prepend(accordion);

  let panel = document.createElement("div");
  panel.className = "panel";
  let panelInnerHtml = "<div class='panel__inner'>";
  panelInnerHtml += createSlider(
    "Choose a Color",
    "colourPicker",
    "colour-picker",
    "--hueBasic",
    "360"
  );
  panelInnerHtml += createSlider(
    "Choose Saturation",
    "satPicker",
    "sat-picker",
    "--baseSaturation",
    "100",
    "%"
  );
  panelInnerHtml += createSlider(
    "Choose Width",
    "widthPicker",
    "width-picker",
    "--mainWidth",
    "1000",
    "px"
  );
  panelInnerHtml += "</div>";

  panel.innerHTML = panelInnerHtml;
  accordion.parentNode.insertBefore(panel, accordion.nextSibling);

  let colourInput = document.querySelectorAll(".custom-slider");
  colourInput.forEach((input) => input.addEventListener("input", changeColour));

  var acc = global.d.querySelectorAll(".accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");

      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
createStyleController();

document.querySelector(".accordion").addEventListener("click", () => {
  let l = document.querySelector(".accordion-icon-container");
  l.classList.toggle("accordion-icon-container--active");
});

// createStyleController();

//usage:
readTextFile("./MOCK_DATA.json", function (text) {
  var data = JSON.parse(text);
  let sliced = data.slice(0, 5);
  myFunction(sliced, global);
});
