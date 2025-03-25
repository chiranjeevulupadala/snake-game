var endX = 500;
var endY = 500;
var dotSize = 20;

var direction = "";
var snakeDots = [];
var foodPosition = [];

var stage = document.getElementById("stage");

function regesteerDirectiron() {}

// REGISTER DIRECTIONS BASED ON UP, DOWN, LEFT, RIGHT
window.addEventListener("keyup", (event) => {
  var c = event.keyCode;
  if ("37,38,39,40".indexOf(c) != -1) {
    if (
      (c == 39 && direction != 37) ||
      (c == 37 && direction != 39) ||
      (c == 38 && direction != 40) ||
      (c == 40 && direction != 38)
    ) {
      direction = c;
    }
  }
});

//
function calculateNewX(current) {
  var x = Number(current.replace("px", ""));
  if (direction == 37) {
    x -= dotSize;
  } else if (direction == 39) {
    x += dotSize;
  }
  return Math.max(0, Math.min(x, endX - dotSize)) + "px";
}

//
function calculateNewY(current) {
  var y = Number(current.replace("px", ""));
  if (direction == 38) {
    y -= dotSize;
  } else if (direction == 40) {
    y += dotSize;
  }
  return Math.max(0, Math.min(y, endY - dotSize)) + "px";
}

//

var foodDot = document.createElement("div");
foodDot.classList.add("food");
stage.appendChild(foodDot);
function reLocateFood() {
  var rx = Math.floor(Math.random() * 25) * dotSize;
  var ry = Math.floor(Math.random() * 25) * dotSize;
  foodDot.style.left = rx + "px";
  foodDot.style.top = ry + "px";
  foodDot.style.width = dotSize + "px";
  foodDot.style.height = dotSize + "px";
  foodPosition = [rx + "px", ry + "px"];
}

function addSnakeDot(cx, cy) {
  var dot = document.createElement("div");
  dot.classList.add("dot");
  dot.style.left = cx;
  dot.style.top = cy;
  dot.style.width = dotSize + "px";
  dot.style.height = dotSize + "px";
  stage.appendChild(dot);
  // snakeDots.splice(0, 0, dot);
  snakeDots.push(dot);
}

function moveSnake() {
  if (direction) {
    var head = snakeDots[0];
    var cx = head.style.left;
    var cy = head.style.top;
    var nx = calculateNewX(cx);
    var ny = calculateNewY(cy);
    if (cx == nx && cy == ny) {
      return;
    }
    if (foodPosition[0] == nx && foodPosition[1] == ny) {
      // clearInterval(myTimer);
      reLocateFood();
      addSnakeDot(nx, ny);
      // setTimeout(startnTimer, 2000);
    } else {
      var dot = snakeDots.pop();
      snakeDots.splice(0, 0, dot);
      dot.style.left = nx;
      dot.style.top = ny;
    }
  }
}

var myTimer = setInterval(moveSnake, 100);

addSnakeDot("240px", "240px");
reLocateFood();
