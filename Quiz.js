class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide(); 
    background("yellow");
    fill(0);
    textSize(15);
    text("Result of the Quiz",340,50);
    
    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
     var  display_Answer = 230;
      fill("Blue");
      textSize(20);
      text("**NOTE Contestants who answered the correct are highlighted with green color!",90,350);
    }
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
        fill("Green");
        else
        fill("red");

        display_Answer+=30;
        textSize(20);
        text(allContestants[plr].name + ":" + allContestants[plr].answer,250 ,display_Answer);
    }
  }
}
