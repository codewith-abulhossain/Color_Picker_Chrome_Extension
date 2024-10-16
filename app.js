// TODO LIST
//1. Select the all selectors
// 2. Make pick color btn functionality
// 3. Make copy color functionality
// 4. show color on the dom
// 5. clear button to remove all the previously selected colors

const colorPickerBtn = document.getElementById("color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
// const pickedColor = [];
// step 5
let pickedColor = JSON.parse(localStorage.getItem("picked-colors") || "[]");

// step 1:
const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    // console.log("eyeDropper");

    const colorCode = await eyeDropper.open();
    // console.log(colorCode.sRGBHex);

    navigator.clipboard.writeText(colorCode.sRGBHex);

    pickedColor.push(colorCode.sRGBHex);
    showColor();

    // step 4
    localStorage.setItem("picked-colors", JSON.stringify(pickedColor));
    // console.log(pickedColor);
  } catch (error) {
    alert("Failed to pick color");
  }
};

// step 2
const showColor = () => {
  if (pickedColor.length > 0) {
    document.querySelector(".picked-colors").style.display = "block";
    colorList.innerHTML = pickedColor
      .map(
        (color) => `
          <li class="color">
            <span class="rect" style="background-color:${color}"></span>
            <span class="value hex">${color}</span>
          </li>`
      )
      .join("");
    // step 7
    let colors = document.querySelectorAll(".color");
    colors.forEach((li) => {
      li.addEventListener("click", (e) => {
        let color = e.target.innerText;
        navigator.clipboard.writeText(e.target.innerText);
        e.target.innerText = "copied";
        setTimeout(() => {
          e.target.innerText = color;
        }, 1000);
      });
    });
  } else {
    document.querySelector(".picked-colors").style.display = "none";
    // colorList.innerHTML = "<li> No color found </li>";
  }
};

// step 3

const clearListOfColors = () => {
  // colorList.innerHTML = "";
  pickedColor.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColor));
  document.querySelector(".picked-colors").style.display = "none";
};

// step 4

colorPickerBtn.addEventListener("click", activateEyeDropper);
clearAll.addEventListener("click", clearListOfColors);
showColor();
