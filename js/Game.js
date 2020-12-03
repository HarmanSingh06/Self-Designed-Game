class Game {
  constructor(){

  }

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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    //Astronaut 1 
    astronaut1 = createSprite(100,200);
    astronaut1.scale = 0.2;
    if(keyIsDown(RIGHT_ARROW)){
      astronaut1.addAnimation("Astrounat1",astrounat1_Anim);
    }
    if(keyIsDown(LEFT_ARROW)){
      astronaut1.addAnimation("Astrounat1REV",astrounat1_Anim_REV);
    }
    if(keyIsDown(UP_ARROW)){
      astrounat1.addAnimation("Astrounat1REV",astrounat1_Anim_REV)
    }
    

    astronaut2 = createSprite(300,200);
    astronaut2.addAnimation("car2",car2_img);
    
    astronaut3 = createSprite(500,200);
    astronaut3.addAnimation("car3",car3_img);
    
    astronaut4 = createSprite(700,200);
    astronaut4.addAnimation("car4",car4_img);
    
    astronauts = [astronaut1, astronaut2, astronaut3, astronaut4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth*4, displayHeight*2);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //use data form the database to display the cars in X direction
        x = displayWidth - allPlayers[plr].distanceX;
        astronauts[index-1].x = x;
        
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distanceY;
        
        astronauts[index-1].y = y;

        if (index === player.index){
          astronauts[index - 1].shapeColor = "red";
          camera.position.x = astronauts[index-1].x;
          camera.position.y = astronauts[index-1].y;
        }
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distanceY +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distanceX +=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distanceX -=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distanceY -=10
      player.update();
    }


    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
