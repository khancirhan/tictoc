var activePlayer, board, scoreX, score0, tie, gamePlaying;

init();

document.getElementById("c00").addEventListener("click", mark);
document.getElementById("c01").addEventListener("click", mark);
document.getElementById("c02").addEventListener("click", mark);
document.getElementById("c10").addEventListener("click", mark);
document.getElementById("c11").addEventListener("click", mark);
document.getElementById("c12").addEventListener("click", mark);
document.getElementById("c20").addEventListener("click", mark);
document.getElementById("c21").addEventListener("click", mark);
document.getElementById("c22").addEventListener("click", mark);

document.getElementById("new-btn").addEventListener("click", init);
document.getElementById("restart-btn").addEventListener("click", function() {
  // set everything to default values
  setToDefault();

  // change player turn in alternative games
  changePlayer();
});

function init() {
  setToDefault();

  scoreX = 0;
  score0 = 0;
  tie = 0;

  // render default values on GUI
  document.querySelector(".score.pX").textContent = scoreX;
  document.querySelector(".score.p0").textContent = score0;

  document.querySelector(".score.tie").textContent = tie;
}

function setToDefault() {
  gamePlaying = true;

  activePlayer = "X";

  // initialize the board contents to null
  board = [["", "", ""], ["", "", ""], ["", "", ""]];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      document.getElementById("c" + i + j).textContent = "";
    }
  }

  // remove win class from every cell
  document.getElementById("c00").classList.remove("win");
  document.getElementById("c01").classList.remove("win");
  document.getElementById("c02").classList.remove("win");
  document.getElementById("c10").classList.remove("win");
  document.getElementById("c11").classList.remove("win");
  document.getElementById("c12").classList.remove("win");
  document.getElementById("c20").classList.remove("win");
  document.getElementById("c21").classList.remove("win");
  document.getElementById("c22").classList.remove("win");

  // remove highlight class from player panels and tie panel
  document.getElementById("ppX").classList.remove("highlight");
  document.getElementById("pp0").classList.remove("highlight");

  document.getElementById("ppTie").classList.remove("highlight");
}

function mark() {
  // check if the game is still going on
  if (gamePlaying) {
    var cell = document.getElementById(this.id);

    // only set to "X" or "0" if the cell is empty
    if (cell.textContent === "") {
      // set content to either "X" or "0"
      cell.textContent = activePlayer;

      // add the data to the board
      board[cell.id[1]][cell.id[2]] = cell.textContent;

      activePlayer === "X"
        ? (cell.style.color = "red")
        : (cell.style.color = "#10cc10");

      // check for victory
      if (checkVictory()) {
        if (activePlayer === "X") {
          scoreX += 1;
          document.querySelector(".score.pX").textContent = scoreX;
        } else if (activePlayer === "0") {
          score0 += 1;
          document.querySelector(".score.p0").textContent = score0;
        }

        // stop the game
        gamePlaying = false;
      }
      // check for tie
      else if (checkTie()) {
        tie += 1;
        document.querySelector(".score.tie").textContent = tie;

        gamePlaying = false;
      } else {
        changePlayer();
      }
    }
  }
}

function checkVictory() {
  for (var i = 0; i < 3; i++) {
    // check rows for "X" or "0" victory
    if (
      board[i][0] != "" &&
      board[i][0] == board[i][1] &&
      board[i][1] == board[i][2]
    ) {
      document.getElementById("c" + i + "0").classList.add("win");
      document.getElementById("c" + i + "1").classList.add("win");
      document.getElementById("c" + i + "2").classList.add("win");

      document.getElementById("pp" + activePlayer).classList.add("highlight");
      return true;
    }

    // check columns for "X" or "0" victory
    if (
      board[0][i] != "" &&
      board[0][i] == board[1][i] &&
      board[1][i] == board[2][i]
    ) {
      document.getElementById("c0" + i).classList.add("win");
      document.getElementById("c1" + i).classList.add("win");
      document.getElementById("c2" + i).classList.add("win");

      document.getElementById("pp" + activePlayer).classList.add("highlight");
      return true;
    }
  }

  // check diagnols for "X" or "0" victory
  if (
    board[0][0] != "" &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  ) {
    document.getElementById("c00").classList.add("win");
    document.getElementById("c11").classList.add("win");
    document.getElementById("c22").classList.add("win");

    document.getElementById("pp" + activePlayer).classList.add("highlight");
    return true;
  }

  if (
    board[0][2] != "" &&
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0]
  ) {
    document.getElementById("c02").classList.add("win");
    document.getElementById("c11").classList.add("win");
    document.getElementById("c20").classList.add("win");

    document.getElementById("pp" + activePlayer).classList.add("highlight");
    return true;
  }

  return false;
}

function checkTie() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }

  document.getElementById("ppTie").classList.add("highlight");
  return true;
}

function changePlayer() {
  var ppX = document.getElementById("ppX");
  var pp0 = document.getElementById("pp0");

  ppX.classList.remove("active");
  pp0.classList.remove("active");

  // change active player
  if (activePlayer === "X") {
    activePlayer = "0";
    pp0.classList.add("active");
  } else if (activePlayer === "0") {
    activePlayer = "X";
    ppX.classList.add("active");
  }
}
