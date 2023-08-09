let form = document.querySelector("#controls");
let size = document.querySelector("#size");
let rc = document.querySelector("#number");
let finish = document.querySelector(".after");
let replay = document.querySelector(".replay");
let close = document.querySelector(".quit");

let newMaze;

form.addEventListener("submit", generateMaze);
document.addEventListener("keydown", move);
replay.addEventListener("click", () => {
  location.reload();
});

close.addEventListener("click", () => {
  finish.style.display = "none";
});

// Creating the maze
function generateMaze(e) {
  e.preventDefault();

  if (rc.value == "" || size.value == "") {
    return alert("Please enter all fields");
  }

  let mazeSize = size.value;
  let number = rc.value;
  if (mazeSize > 900 || number > 90) {
    alert("Maze too large!");
    return;
  }

  form.style.display = "none";

  newMaze = new MazeRunner(mazeSize, number, number);
  newMaze.setup();
  newMaze.draw();
}

// Move the player in the maze
function move(e) {
  if (!generationComplete) return;
  let key = e.key;
  let row = current.rowNum;
  let col = current.colNum;

  switch (key) {
    case "ArrowUp":
      if (!current.walls.topWall) {
        let next = newMaze.grid[row - 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
      }
      break;

    case "ArrowRight":
      if (!current.walls.rightWall) {
        let next = newMaze.grid[row][col + 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) finish.style.display = "block";
      }
      break;

    case "ArrowDown":
      if (!current.walls.bottomWall) {
        let next = newMaze.grid[row + 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) finish.style.display = "block";
      }
      break;

    case "ArrowLeft":
      if (!current.walls.leftWall) {
        let next = newMaze.grid[row][col - 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
      }
      break;
  }
}
