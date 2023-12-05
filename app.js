const range = document.getElementById("range");
const tricks = document.getElementById("tricks");

range.addEventListener("input", (e) => {
  // Get the label (which is the nextElementSibling)
  const label = e.target.nextElementSibling;
  // Get value of the input
  const value = +e.target.value;
  // Get the width value of the input
  const range_width = getComputedStyle(e.target).getPropertyValue("width");
  // Get the width value of the label
  const label_width = getComputedStyle(label).getPropertyValue("width");

  // Remove 'px' and conver to number
  const num_width = +range_width.substring(0, range_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);

  // Get min and max values
  const max = +e.target.max;
  const min = +e.target.min;
  // Calculate the left value
  const left =
    value * (num_width / max) -
    num_label_width / 2 +
    scale(value, min, max, 10, -10);

  label.style.left = `${left}px`;
  label.style.transform = `translateX(25%)`;
  label.innerHTML = value;

  tricks.innerHTML = "";
  tricks.appendChild(generateTricks(50, value));
  range.style.backgroundSize = `${((value - min) * 100) / (max - min)}% 100%`;
});

window.onload = () => {
  tricks.appendChild(generateTricks(50, 0));
  range.value = 0;
};

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function getThumbPosition() {
  const thumbPosition = (range.value - range.min) / (range.max - range.min);
  const pixelPosition =
    thumbPosition * (range.offsetWidth - range.offsetHeight);
  return pixelPosition;
}

function generateTricks(tN = 100, position = 25) {
  const div = document.createElement("div");
  div.className = "sliderticks";
  for (let i = 1; i <= tN; i++) {
    const span = document.createElement("span");
    if (
      i == 1 ||
      i == 10 ||
      i == 20 ||
      i == 30 ||
      i == 40 ||
      i == 50 ||
      i == 60 ||
      i == 70 ||
      i == 80 ||
      i == 90 ||
      i == 100
    ) {
      span.style.height = "15px";
      div.appendChild(span);
    } else {
      div.appendChild(span);
    }

    if (i == position - 2) {
      span.className = "down1";
    }
    if (i == position - 1) {
      span.className = "down2";
    }
    if (i == position) {
      span.className = "down3";
    }
    if (i == position + 1) {
      span.className = "down4";
    }
    if (i == position + 2) {
      span.className = "down5";
    }
  }
  return div;
}
