/*
 * S T A R   W A R S   R P G
 * Episode XV: A Bunch of Characters Fight Each Other
 * By Jordan Boggs
 */

Luke = function() {
  return {
    name: "Luke Skywalker",
    hp: 100,
    ap: 6,
    cap: 18,
    selected: false,
    id: "#luke"
  };
};

ObiWan = function() {
   return {
    name: "Obi-Wan Kenobi",
    hp: 80,
    ap: 8,
    cap: 20,
    selected: false,
    id: "#obi-wan"
   }
};

DarthVader = function() {
  return {
    name: "Darth Vader",
    hp: 120,
    ap: 6,
    cap: 18,
    selected: false,
    id: "#darth-vader"
  };
};

Emperor = function() {
  return {
    name: "Emperor Palpatine",
    hp: 70,
    ap: 10,
    cap: 22,
    selected: false,
    id: "#emperor"
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
var rogueGallery;

// PLAYER SELECT
$(".char").click(function () {
  var id = "#" + $(this).attr('id');
  charClick(id);
});

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
    rogueGallery = $("#enemy-select").html();

    // advance to next phase
    phase = 1; 
  }
  else if (phase === 1) {
    var selection = char;
    console.log("selection:",selection);
    var transit = $(selection).attr("id","class","src","alt");
    console.log("transit",transit);
    
    // select character data
    if (selection === "#luke") {
      Luke.selected = true;
      enemySelection = new Luke();
    } 
    else if (selection === "#obi-wan") {
      ObiWan.selected = true;
      enemySelection = new ObiWan();
    } 
    else if (selection === "#darth-vader") {
      DarthVader.selected = true;
      enemySelection = new DarthVader();
    } 
    else if (selection === "#emperor") {
      Emperor.selected = true;
      enemySelection = new Emperor();
    } 
    else {
      console.log("enemySelection invalid");
    }

    // take char out of #enemy-select
    $(selection).hide();
    
    // write char to #current-enemy
    $("#enemy-zone").show();
    $("#current-enemy-h2").show();
    $("#current-enemy").html(transit);
    $("#current-enemy").show();
    $("#enemy-name").html("<h3>"+enemySelection.name+"</h3>");

    // hide the rest of #enemy-select
    $("#enemy-select-h2").hide();
    $("#enemy-select").children().hide();

    // advance to next phase
    phase = 2;
    beginPhase2();
  }
} // end function charClick

// Set up UI for gameplay
function beginPhase2() {
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
  $("#player-hp").text(playerHp);
  $("#enemy-hp").text(enemyHp);
} // end function displayHp

// What happens when you click attack?
$("#attack").click(function () {
  if (phase === 2) {
    enemyHp -= playerAp;
    playerAp += playerBaseAp;
    playerHp -= enemySelection.cap;
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
    $("#messages").text("You lose :(");
  }
  // Check for enemy defeat condition
  else if (enemyHp <= 0) {
    // Go back to enemy selection
    phase = 1;

    // Hide what's currently showing
    $("#enemy-zone").hide(); 
    $("#fight-data").hide();

    // Set display to enemy selection MINUS the already 
    // chosen characters
    $("#enemy-select-h2").show();
    $("#enemy-select").html(rogueGallery);

    // Available characters are only ones that have not been selected
    if (Luke.selected) {
      $("#luke").hide();
    } else if (ObiWan.selected) {
      $("#obi-wan").hide();
    } else if (DarthVader.selected) {
      $("#darth-vader").hide();
    } else if (Emperor.selected) {
      $("#emperor").hide();
    }

    // PLAYER SELECT
    $(".char").click(function () {
      var id = "#" + $(this).attr('id');
      charClick(id);
    });
  }
};


/*
 * CURRENT ISSUES
 * 
 * When you select your THIRD enemy, your second enemy is still an
 * option.
 * 
 * Every time a battle starts, player's HP resets
 * 
 */