var endX = 500;
var endY = 500;
var dotSize = 20;

var direction = "";
var snakeDots = [];
var foodPosition = [];
var occupied = [];
var freeSpots = [];

var stage = document.getElementById("stage");

function regesteerDirectiron() {}

// REGISTER DIRECTIONS BASED ON UP, DOWN, LEFT, RIGHT
var directionChangeCooldownActive = false;
window.addEventListener("keyup", (event) => {
  var c = event.keyCode;
  if ("37,38,39,40".indexOf(c) != -1 && !directionChangeCooldownActive) {
    if (direction != c + 2 && direction != c - 2) {
      console.log("changing to : ", c);
      direction = c;
      directionChangeCooldownActive = true;
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
  var rx = Math.floor((Math.random() + 0.2) * 18) * dotSize;
  var ry = Math.floor((Math.random() + 0.2) * 18) * dotSize;
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
  snakeDots.splice(0, 0, dot);
}

function moveSnake() {
  directionChangeCooldownActive = false;
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
      reLocateFood();
      addSnakeDot(nx, ny);
    } else {
      var dot = snakeDots.pop();
      snakeDots.splice(0, 0, dot);
      dot.style.left = nx;
      dot.style.top = ny;
    }
  }
}

function calculateFreeSpots() {
  freeSpots = [];
}

setInterval(moveSnake, 100);
addSnakeDot("240px", "240px");
reLocateFood();
