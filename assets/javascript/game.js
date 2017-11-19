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

// PLAYER SELECT
$("#luke").on("click", function() {
  if (phase === 0) {
    var transit = $("#luke").html();
    console.log(transit);
    // take luke.jpg out of #char-select
    $("#luke").hide();
    // write luke.jpg to #your-char
    $("#your-char").html(transit);
  }
});