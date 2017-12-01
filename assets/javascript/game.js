/*
 * S T A R   W A R S   R P G
 * Episode XV: A Bunch of Characters Fight Each Other
 * By Jordan Boggs
 */

var loneStarr = {
  name: "Lone Starr",
  hp: 90,
  ap: 6,
  cap: 9,
  selected: false,
  id: "#lone-starr"
};

var vespa = {
  name: "Princess Vespa",
  hp: 95,
  ap: 6,
  cap: 7,
  selected: false,
  id: "#vespa"
};

var darkHelmet = {
  name: "Dark Helmet",
  hp: 80,
  ap: 7,
  cap: 9,
  selected: false,
  id: "#dark-helmet"
};

var president = {
  name: "President Skroob",
  hp: 75,
  ap: 8,
  cap: 10,
  selected: false,
  id: "#president"
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
    if (selection === "#lone-starr") {
      loneStarr.selected = true;
      playerSelection = loneStarr;
    } 
    else if (selection === "#vespa") {
      vespa.selected = true;
      playerSelection = vespa;
    } 
    else if (selection === "#dark-helmet") {
      darkHelmet.selected = true;
      playerSelection = darkHelmet;
    } 
    else if (selection === "#president") {
      president.selected = true;
      playerSelection =president;
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

    // show #enemy-select
    $("#enemy-select-h2").show();
    $("#enemy-select").show();

    // move the rest of #char-select to #enemy-select
    transit = $("#char-select").attr("id","class","src","alt");
    $("#char-select").children().hide();
    $("#enemy-select").html(transit);
    $("#char-select-h2").hide();
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
    if (selection === "#lone-starr") {
      loneStarr.selected = true;
      enemySelection = loneStarr;
    } 
    else if (selection === "#vespa") {
      vespa.selected = true;
      enemySelection = vespa;
    } 
    else if (selection === "#dark-helmet") {
      darkHelmet.selected = true;
      enemySelection = darkHelmet;
    } 
    else if (selection === "#president") {
      president.selected = true;
      enemySelection = president;
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
    $("#rogue-gallery").hide();
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
    var audio = new Audio("./assets/audio/goodumb.mp3");
    audio.play();
    $("#messages").text("Evil will always triumph. Because good is dumb.");
    $("#fight-data").hide();
  }
  // Check for enemy defeat condition
  else if (enemyHp <= 0) {
    // Go back to enemy selection
    phase = 1;

    // Hide what's currently showing
    $("#enemy-zone").hide(); 
    $("#fight-data").hide();

    // Check for victory
    if (loneStarr.selected && vespa.selected && 
      darkHelmet.selected && president.selected) {
      var audio = new Audio("./assets/audio/spaceballs_schwartz1.wav");
      audio.play();
      $("#messages").html("<h1>May the Schwartz be with you!</h1>");
    }
    else {
      // Set display to enemy selection MINUS the already 
      // chosen characters
      $("#rogue-gallery").show();
      $("#enemy-select-h2").show();
      $("#enemy-select").html(rogueGallery);

      // Available characters are only ones that have not been selected
      if (loneStarr.selected) {
        $("#lone-starr").hide();
      } 
      if (vespa.selected) {
        $("#vespa").hide();
      } 
      if (darkHelmet.selected) {
        $("#dark-helmet").hide();
      } 
      if (president.selected) {
        $("#president").hide();
      }

      // PLAYER SELECT
      $(".char").click(function () {
        var id = "#" + $(this).attr('id');
        charClick(id);
      });
    }
  }
};