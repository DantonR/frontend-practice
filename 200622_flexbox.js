let myFunction = (data, g) => {
  data.forEach((element) => {
    let heading = g.d.createElement("h1");
    heading.innerHTML = element.first_name + " " + element.last_name;
    g.m.appendChild(heading);
  });

  function createBoxContainer() {
    let boxContainer = g.d.createElement("div");
    boxContainer.className = "box-container";
    boxContainer.style.display = "flex";
    boxContainer.style.flexWrap = "wrap";
    g.m.appendChild(boxContainer);
  }

  createBoxContainer();

  class Box {
    constructor(height, width, bgColor, margins) {
      this.height = height;
      this.width = width;
      this.bgColor = bgColor;
      this.margins = margins;
    }

    create() {
      let newBox = g.d.createElement("div");
      newBox.style.height = this.height + "px";
      newBox.style.background = this.bgColor;
      newBox.style.margin = this.margins;
      newBox.style.flex = 1;
      bc.appendChild(newBox);
    }
  }

  let bc = g.d.querySelector(".box-container");

  let newBox = new Box(100, 100, "black", "5px");

  for (let i = 0; i < 3; i++) {
    newBox.create();
  }
};

export { myFunction };
