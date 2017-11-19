/*
 * S T A R   W A R S   R P G
 * Episode XV: A Bunch of Characters Fight Each Other
 * By Jordan Boggs
 */

var avatar = {
  luke: {
    hp: 100,
    ap: 6,
    cap: 18
  },
  obiWan: {
    hp: 80,
    ap: 8,
    cap: 20
  },
  darthVader: {
    hp: 120,
    ap: 6,
    cap: 18
  },
  emperor: {
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

// PLAYER SELECT
$(".char").click(function () {
  var id = "#" + $(this).attr('id');
  charClick(id);

  if (id === "#luke") {
    playerSelection = avatar.luke;
  } else if (id === "obi-wan") {
    playerSelection = avatar.obiWan;
  } else if (id === "darth-vader") {
    playerSelection = avatar.darthVader;
  } else if (id === "emperor") {
    playerSelection = avatar.emperor;
  } else {
    console.log("playerSelection invalid");
  }
});

function charClick(char) {
  if (phase === 0) {
    var transit = $(char).html();

    // take char out of #char-select
    $(char).hide();

    // write char to #your-char
    $("#your-char").html(transit);

    // move the rest of #char-select to #enemy-select
    transit = $("#char-select").html();
    $("#char-select").children().hide();
    $("#enemy-select").html(transit);

    phase = 1;
  }

  if (phase === 1) {
    var transit = $(char).html();

    // take char out of #enemy-select
    $(char).hide();

    // write char to #current-enemy
    $("current-enemy").html(transit);
  }
}