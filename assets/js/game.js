$(document).ready(function(){

  var red = $("#red");
  var yellow = $("#yellow");
  var green = $("#green");
  var blue = $("#blue");
  var randomNum = $(".random-number");
  var guessSum = $(".guess-sum");
  var gem = $(".gem");
  var win = $(".win")
  var lose = $(".loss")

  var game = {
    runningSum: 0,
    currentRandom: 0,
    gemNums: [],
    
    gems: {
      red: 0,
      yellow: 0,
      green: 0,
      blue: 0
    },
    
    scoreboard: {
      wins: 0,
      losses: 0
    },
    
    getRandom: function(min, max){
      return Math.floor(Math.random()*(max-min+1)+min);
    },
    
    init: function(){
      var _this = this;
      var i = 0;
      var tempNum;
      this.gemNums = [];

      this.currentRandom = this.getRandom(19, 120);

      while(this.gemNums.length < 4){
        tempNum = this.getRandom(1,9);
        if(this.gemNums.indexOf(tempNum) === -1){
          this.gemNums.push(tempNum);
        }
      }

      Object.keys(this.gems).forEach(function(keyId){
        _this.gems[keyId] = _this.gemNums[i];
        i++;
      });
    },
    
    reset: function(){
      this.currentRandom = 0;
      this.runningSum = 0;
      this.init();
    },

    play: function(gemClicked){
      this.runningSum += this.gems[gemClicked];
    },

    checkWin: function(){
      if(this.currentRandom === this.runningSum){
        this.scoreboard.wins += 1;
        this.reset()
      } else if(this.currentRandom < this.runningSum){
        this.scoreboard.losses += 1;
        this.reset()
      } 
    },

    redraw: function(){
      randomNum.html(this.currentRandom);
      guessSum.html(this.runningSum);
      win.html("Wins: " + this.scoreboard.wins);
      lose.html("Losses: " + this.scoreboard.losses);
    }
  }

  //Initialize the game
  game.init();
  game.redraw();

  //Listen for clicks on gems
  gem.click(function(gemClicked){
    game.play($(this).attr("id"));
    game.checkWin();
    game.redraw();
  })
})



