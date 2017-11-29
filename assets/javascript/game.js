/*
 * S T A R   W A R S   R P G
 * Episode XV: A Bunch of Characters Fight Each Other
 * By Jordan Boggs
 */

var Luke = function() {
  return {
    name: "Luke Skywalker",
    hp: 100,
    ap: 6,
    cap: 18,
    selected: false
  };
};

var ObiWan = function() {
   return {
    name: "Obi-Wan Kenobi",
    hp: 80,
    ap: 8,
    cap: 20,
    selected: false
   }
};

var DarthVader = function() {
  return {
    name: "Darth Vader",
    hp: 120,
    ap: 6,
    cap: 18,
    selected: false
  };
};

var Emperor = function() {
  return {
    name: "Emperor Palpatine",
    hp: 70,
    ap: 10,
    cap: 22,
    selected: false
  };
};

/*
 * Here are the phases of play:
 * 0: Select player character
 * 1: Select enemy
 * 2: Play begins until someone runs out of HP
 * 3: Game over: win :D
 * 4: Game over: loss :(
 */
var phase = 0;
var playerSelection;
var enemySelection;
var enemiesRemaining = 3;
var playerHp;       
var enemyHp;        
var playerAp;       
var playerBaseAp;

function charClick(char) {
  if (phase === 0) {
    var selection = char;
    var transit = $(char).attr("id","class","src","alt");

    // select character data
    if (selection === "#luke") {
      Luke.selected = true;
      playerSelection = new Luke();
    } 
    else if (selection === "#obi-wan") {
      ObiWan.selected = true;
      playerSelection = new ObiWan();
    } 
    else if (selection === "#darth-vader") {
      DarthVader.selected = true;
      playerSelection = new DarthVader();
    } 
    else if (selection === "#emperor") {
      Emperor.selected = true;
      playerSelection = new Emperor();
    } 
    else {
      console.log("playerSelection invalid");
    }

    // take char out of #char-select
    $(char).hide();
    
    // write char to #your-char
    $("#your-char-h2").show();
    $("#your-char").html(transit);
    $("#char-name").html("<h3>"+playerSelection.name+"</h3>");

    // move the rest of #char-select to #enemy-select
    transit = $("#char-select").attr("id","class","src","alt");
    $("#char-select").children().hide();
    $("#enemy-select").html(transit);

    // advance to next phase
    phase = 1; 
  }
  else if (phase === 1) {
    var selection = char;
    var transit = $(selection).attr("id","class","src","alt");
    
    // select character data
    if (selection === "#luke") {
      enemySelection = new Luke();
    } 
    else if (selection === "#obi-wan") {
      enemySelection = new ObiWan();
    } 
    else if (selection === "#darth-vader") {
      enemySelection = new DarthVader();
    } 
    else if (selection === "#emperor") {
      enemySelection = new Emperor();
    } 
    else {
      console.log("playerSelection invalid");
    }

    // take char out of #enemy-select
    $(selection).hide();
    
    // write char to #current-enemy
    $("#current-enemy-h2").show();
    $("#current-enemy").html(transit);
    $("#enemy-name").html("<h3>"+enemySelection.name+"</h3>");

    // hide the rest of #enemy-select
    $("#enemy-select-h2").hide();
    $("#enemy-select").children().hide();

    // advance to next phase
    phase = 2;
    beginPhase2();
  }
} // end function charClick

// PLAYER SELECT
$(".char").click(function () {
  var id = "#" + $(this).attr('id');
  console.log("Click event:",id,"Phase:",phase);
  charClick(id);
});

// Set up UI for gameplay
function beginPhase2() {
  // Log selections
  console.log("playerSelection:",playerSelection);
  console.log("enemySelection",enemySelection);

  // Display fight data
  $("#fight-data").show();

  // Initialize HP
  playerHp = playerSelection.hp;
  enemyHp = enemySelection.hp;
  displayHp();

  // Initialize AP
  playerAp = playerSelection.ap;
  playerBaseAp = playerAp;

} // end function beginPhase2

// This function updates HP displays
function displayHp() {
  console.log("playerHp:",playerHp);  
  $("#player-hp").text(playerHp);
  console.log("enemyHp:",enemyHp);
  $("#enemy-hp").text(enemyHp);
} // end function displayHp

// What happens when you click attack?
$("#attack").click(function () {
  if (phase === 2) {
    console.log("Attack!");
    enemyHp -= playerAp;
    playerAp += playerBaseAp;
    console.log("enemyHp:",enemyHp);
    playerHp -= enemySelection.cap;
    console.log("playerHp:",playerHp);
    displayHp();

    // check if player's HP is 0
    checkHp();
  } else {
    console.log("Attack invalid, phase is " + phase);
  }
});

// Function to check player's and enemy's hp
var checkHp = function() {
  // Check for loss condition
  if (playerHp <= 0) {
    phase = 4;
    console.log("Player has lost");
    $("#messages").text("You lose :(");
  } else {
    console.log("Player HP is " + playerHp);
  }

  // Check for enemy defeat condition
  if (enemyHp <= 0) {
    // Go back to enemy selection
    phase = 1;

    // Set display to enemy selection MINUS the already 
    // chosen characters
    $("#char-select").show();

    // Available characters are only ones that have not been selected
    var roster = [Luke, ObiWan, DarthVader, Emperor];
    for (i = 0; i < roster.length; i++) {
      // Let's pick an object
      var checkIt = roster[i];
      if (!checkIt.selected) {
        console.log("Display " + checkIt.name);
        // display the character
      } else {
        console.log(checkIt.name + "not available for selection.");
      }
    }
  }
};
