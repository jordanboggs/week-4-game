/*
 * S T A R   W A R S   R P G
 * Episode XV: A Bunch of Characters Fight Each Other
 * By Jordan Boggs
 */

var avatar = {
  luke: {
    name: "Luke Skywalker",
    hp: 100,
    ap: 6,
    cap: 18
  },
  obiWan: {
    name: "Obi-Wan Kenobi",
    hp: 80,
    ap: 8,
    cap: 20
  },
  darthVader: {
    name: "Darth Vader",
    hp: 120,
    ap: 6,
    cap: 18
  },
  emperor: {
    name: "Emperor Palpatine",
    hp: 70,
    ap: 10,
    cap: 22
  }
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
var playerHp;       // we don't want to change the object
var enemyHp;        // we don't want to change the object
var playerAp;       // we don't want to change the object

function charClick(char) {
  if (phase === 0) {
    var selection = char;
    var transit = $(char).attr("id","class","src","alt");

    // select character data
    if (selection === "#luke") {
      playerSelection = avatar.luke;
    } 
    else if (selection === "#obi-wan") {
      playerSelection = avatar.obiWan;
    } 
    else if (selection === "#darth-vader") {
      playerSelection = avatar.darthVader;
    } 
    else if (selection === "#emperor") {
      playerSelection = avatar.emperor;
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
      enemySelection = avatar.luke;
    } 
    else if (selection === "#obi-wan") {
      enemySelection = avatar.obiWan;
    } 
    else if (selection === "#darth-vader") {
      enemySelection = avatar.darthVader;
    } 
    else if (selection === "#emperor") {
      enemySelection = avatar.emperor;
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
  console.log("Attack!");
  enemyHp -= playerAp;
  playerAp += playerAp;
  console.log("enemyHp:",enemyHp);
  playerHp -= enemySelection.cap;
  console.log("playerHp:",playerHp);
  displayHp();
});