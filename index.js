const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = document.getElementById("score")

let scoreNum = 0
let scoreTxt = "SCORE : "

let direction = ""

let start = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

let path = [start];

let maxLength = 1;

let snacks = [];
createSnacks();

ctx.fillStyle = "blue";
ctx.fillRect(snacks.x, snacks.y, 10, 10);

// event listening
window.addEventListener("keydown", function (event) {
  const head = path[path.length - 1];
  // Where is head?
  // Add new position
  if (event.code == "ArrowRight") {
    if (direction != "L") {
      direction = "R"
    }
  } else if (event.code == "ArrowLeft") {
    if (direction != "R") {
      direction = "L"
    }
  } else if (event.code == "ArrowUp") {
    if (direction != "D") {
      direction = "U"
    }
  } else if (event.code == "ArrowDown") {
    if (direction != "U") {
      direction = "D"
    }
  }
});

function reset() {
  clearInterval(draw_interval)
  interval = 12
  draw_interval = setInterval(drawSnake, interval)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  score.innerHTML= "GAME OVER SCORE = " + scoreNum

  scoreNum = 0
  scoreTxt = "SCORE : "

  direction = ""

  let start = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  path = [start];

  maxLength = 1;

  let snacks = [];
  createSnacks();

  ctx.fillStyle = "blue";
  ctx.fillRect(snacks.x, snacks.y, 10, 10);
}

function drawSnake() {
  const head = path[path.length - 1];
  if (direction == "R") {
    if (head.x == canvas.width -10) {
      path.push({ x: 0, y: head.y });
    } else {
      path.push({ x: head.x + 1, y: head.y });
    }
  } else if ( direction == "L" ) {
    if (head.x == 0) {
      path.push({ x: canvas.width -10, y: head.y });
    } else {
      path.push({ x: head.x - 1, y: head.y });
    }
  } else if (direction == "U") {
    if (head.y == 0) {
      path.push({ x: head.x, y: canvas.height -10 });
    } else {
      path.push({ x: head.x, y: head.y - 1 });
    }
  } else if (direction == "D") {
    if (head.y == canvas.height - 10) {
      path.push({ x: head.x, y: 0 });
    } else {
      path.push({ x: head.x, y: head.y + 1 });
    }
  }

  
  while (path.length > maxLength) {
    let tail = path.shift();
    ctx.clearRect(tail.x, tail.y, 10, 10);
  }

  path.forEach((position) => {
    ctx.fillStyle = "black";
    ctx.fillRect(position.x, position.y, 10, 10);
  });


  if (hasLost()) {
    reset()
  }

  let snack = snacks[0];
  
  if (head.x <= snack.x + 10 && snack.x <= head.x + 10 
    && head.y <= snack.y + 10 && snack.y <= head.y + 10) {

    console.log("snack: " + snack.y + " " + snack.x)
    console.log("head: " + head.x + " " + head.y)   
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
      createSnacks();
    const n = {
      x: path[path.length - 1].x,
      y: path[path.length - 1].y,
    };
    for (let i = 0; i <= 10; i++) {
      path.push(n);
    }
    maxLength += 10;

    updateScore()
    clearInterval(draw_interval)
    interval -= interval*0.0005
    draw_interval = setInterval(drawSnake, interval)
  }
}

function createSnacks() {
  let run = true;
  let snack = {
    x: 0,
    y: 0,
  };

  while (run == true) {
    xx = Math.random() * canvas.width;
    yy = Math.random() * canvas.height;
    snack = {
      x: xx - (xx % 10),
      y: yy - (yy % 10),
    };

    let same = false;

    path.forEach((position) => {
      if (position.x == snack.x && position.y == snack.y) {
        same = true;
      }
    });
    run = same;
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(snack.x, snack.y, 10, 10);

  snacks.pop(1);
  snacks.push(snack);
}

function hasLost(head) {
  head = path[path.length -1]
  for (i in path) {
    if (i != path.length-1 && path[i].x == head.x && path[i].y == head.y) {
      return true
    } 
  }
  return false;
}

function updateScore() {
  scoreNum += 1
  score.innerHTML=scoreTxt + scoreNum
}

let dir_x = 1
let dir_y = 1
let snack_direction = "v"

function moveSnack() {
  let snack = snacks[0]
  ctx.clearRect(snack.x, snack.y, 10, 10)

  if (snack.y > canvas.height-20) {
    dir_y = -1
  } else if (snack.y < 10) {
    dir_y = 1
  }

  if (snack.x > canvas.width-20) {
    dir_x = -1
  } else if (snack.x < 10) {
    dir_x = 1
  }

  if (Math.random() > 0.995) {
    if (snack_direction == "v") {
      snack_direction = "h"
    } else {
      snack_direction = "v"
    }
  } 

  if (snack_direction == "h") {
    snack.y += dir_y
  } else{
    snack.x += dir_x
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(snack.x, snack.y, 10, 10);
}

let interval = 12
let draw_interval = setInterval(drawSnake, interval)

let snack_intervall = setInterval(moveSnack, 20)