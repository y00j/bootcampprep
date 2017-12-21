//$("span[name=whoseturn]").text("O")

//or put the file above the ending of the body
// jQuery(document).ready(function(){
//   $("span[name=whoseturn]").text("X")
// });


var currentPlayerName = "X";
var rowName;
var columnName;
var n = 3;
var gameOver;

$("span[name=whoseturn]").text(currentPlayerName);
$("div.gameoverbanner").hide();

$(".player[name=X]").addClass("highlight");
$(".player[name=O]").removeClass("highlight");

$("td").click(
  function() {
    if ($(this).text() !== '' || gameOver) {
      return;
    }

    //
    // alert("somebody clicked on a cell: " + $(this).attr('name') +
    // " with parent row : " +$(this).parent().attr('name'));
    $(this).text(currentPlayerName);

    if (currentPlayerName === "X") {
      currentPlayerName = "0";
      $(".player[name=X]").removeClass("highlight");
      $(".player[name=O]").addClass("highlight");
    } else {
      currentPlayerName = "X";
      $(".player[name=O]").removeClass("highlight");
      $(".player[name=X]").addClass("highlight")
    }

    $("span[name=whoseturn]").text(currentPlayerName);

    // rowName = $(this).parent().attr("name");
    // columnName = $(this).attr("name");

    gameOver = checkRowWin($(this))
                || checkColumnWin($(this))
                || checkDiagonal1Win()
                || checkDiagonal2Win();

    if (gameOver) {
      $("div.gameoverbanner").text("winner is player: " + $(this).text())
      $("div.gameoverbanner").show();
      $("div.next-move").hide();
    }
  }
);

function checkRowWin(cell) {
  var children = cell.parent().children();
  var isWin = true;
  children.each( function() {
    if ($(this).text() !== cell.text()) {
      isWin = false;
    }
  });
  return isWin;
}

function checkColumnWin(cell) {
  var isWin = true;
  var columnCells = $('td[name=' + cell.attr("name") + ']');
  columnCells.each( function() {
    if ($(this).text() !== cell.text()) {
      isWin = false;
    }
  });
  return isWin;
}

function checkDiagonal1Win() {
  var lookupText = 'X';
  if(currentPlayerName === 'X') {
    lookupText = 'O';
  }
  for (i = 0; i < n; i++) {
    if ($("tr[name=" + i + "] > td[name=" + i + "]").text() !== lookupText) {
      return false;
    }
  }
  return true;
}

function checkDiagonal2Win() {
  var lookupText = 'X';
  if(currentPlayerName === 'X') {
    lookupText = 'O';
  }
  for (i = 0; i < n; i++) {
    if ($("tr[name=" + i + "] > td[name=" + (n - 1 - i) + "]").text() !== lookupText) {
      return false;
    }
  }
  return true;
}

// function checkRowWin2() {
//   var lookupText = 'X';
//   if(currentPlayerName === 'X') {
//     lookupText = 'O';
//   }
//
//   var parentRow =  $('tr[name=' + rowName + ']'); //tr[name=rowName]
//   var currentPlayerWon = true;
//   parentRow.children().each(
//     function() {
//       //$(this) will be each item in the array of children
//       if($(this).text() != lookupText) {
//         currentPlayerWon = false;
//       }
//     }
//   );
//   return currentPlayerWon;
// }


// function checkRowWin(cell) {
//   var cellText = cell.text() + cell.text();
//   var siblingText = cell.siblings().text();
//   return cellText === siblingText;
// }
