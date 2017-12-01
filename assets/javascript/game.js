/*
 * S T A R   W A R S   R P G
 * Episode XV: A Bunch of Characters Fight Each Other
 * By Jordan Boggs
 */

var luke = {
  name: "Luke Skywalker",
  hp: 100,
  ap: 6,
  cap: 18,
  selected: false,
  id: "#luke"
};

var obiWan = {
  name: "Obi-Wan Kenobi",
  hp: 80,
  ap: 8,
  cap: 20,
  selected: false,
  id: "#obi-wan"
};

var darthVader = {
  name: "Darth Vader",
  hp: 1200,
  ap: 6,
  cap: 18,
  selected: false,
  id: "#darth-vader"
};

var emperor = {
  name: "Emperor Palpatine",
  hp: 70,
  ap: 10,
  cap: 22,
  selected: false,
  id: "#emperor"
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
      luke.selected = true;
      playerSelection = luke;
    } 
    else if (selection === "#obi-wan") {
      obiWan.selected = true;
      playerSelection = obiWan;
    } 
    else if (selection === "#darth-vader") {
      darthVader.selected = true;
      playerSelection = darthVader;
    } 
    else if (selection === "#emperor") {
      emperor.selected = true;
      playerSelection =emperor;
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

    // Initialize HP
    playerHp = playerSelection.hp;

    // Initialize AP
    playerAp = playerSelection.ap;
    playerBaseAp = playerAp;

    // advance to next phase
    phase = 1; 
  }
  else if (phase === 1) {
    var selection = char;
    var transit = $(selection).attr("id","class","src","alt");
    
    // select character data
    if (selection === "#luke") {
      luke.selected = true;
      enemySelection = luke;
    } 
    else if (selection === "#obi-wan") {
      obiWan.selected = true;
      enemySelection = obiWan;
    } 
    else if (selection === "#darth-vader") {
      darthVader.selected = true;
      enemySelection = darthVader;
    } 
    else if (selection === "#emperor") {
      emperor.selected = true;
      enemySelection = emperor;
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

    // Initialize hp
    enemyHp = enemySelection.hp;
    
    // advance to next phase
    phase = 2;
    beginPhase2();
  }
} // end function charClick

// Set up UI for gameplay
function beginPhase2() {
  // Display fight data
  $("#fight-data").show();

  displayHp();
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

    // Check for victory
    if (luke.selected && obiWan.selected && 
      darthVader.selected && emperor.selected) {
    $("#messages").html("<h1>Winner!!!!!</h1>");
    }
    else {
      // Set display to enemy selection MINUS the already 
      // chosen characters
      $("#enemy-select-h2").show();
      $("#enemy-select").html(rogueGallery);

      // Available characters are only ones that have not been selected
      if (luke.selected) {
        $("#luke").hide();
      } 
      if (obiWan.selected) {
        $("#obi-wan").hide();
      } 
      if (darthVader.selected) {
        $("#darth-vader").hide();
      } 
      if (emperor.selected) {
        $("#emperor").hide();
      }

      // PLAYER SELECT
      $(".char").click(function () {
        var id = "#" + $(this).attr('id');
        charClick(id);
      });
    }
  }
};


/*
 * FEATURES LEFT TO BUILD
 * 
 * Redistribute people's stats so anyone can win
 * 
 */