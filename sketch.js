 var PLAY = 1;
 var END = 0;
 var MENU = 2;
 var gameState = MENU;
 var bg;
 var prince;
 var castle,tower,shooter,fireball,Efireball;
 var ci,ti,si,fi,Prince_Left_run,Prince_Right_run,Prince_idle,prince_throw;
 var fbg,eg,Efbg;
 var edge;
 var sheild,javlinimg,javlin,jg;
 var plifes,tlifes;
 var blast,blast1;
 var enemy,enemy_Group,enemyA;
 var princess,PA;
 var Tittle,tittle_img;
 var Play_button,PBI;
 var HTP_button,HTPi;
 var story_Button, stbi;
 var BlastS,KillS,Throw_FB_sound,sfx;
 var showstory = false;
 var showHTP = false;
 var story,storyimg;
 function preload(){
 bg = loadImage("Images/Bg_Grass.png");
 ci = loadImage("Images/castle_img.png");
 ti  = loadImage("Images/Tower.png");
 si = loadImage("Images/shooter.png");
 fi = loadImage("Images/fireball.png");
 Prince_Right_run = loadAnimation("Images/Prince_Animations/Prince_facing_Right/Prince_Running/Run_1.png",
                                  "Images/Prince_Animations/Prince_facing_Right/Prince_Running/Run_2.png",
                                  "Images/Prince_Animations/Prince_facing_Right/Prince_Running/Run_3.png",
                                  "Images/Prince_Animations/Prince_facing_Right/Prince_Running/Run_4.png");

 Prince_Left_run = loadAnimation ("Images/Prince_Animations/Prince_facing_Left/Prince_Running/Run_1.png",
                                  "Images/Prince_Animations/Prince_facing_Left/Prince_Running/Run_2.png",
                                  "Images/Prince_Animations/Prince_facing_Left/Prince_Running/Run_3.png",
                                  "Images/Prince_Animations/Prince_facing_Left/Prince_Running/Run_4.png");
 
 Prince_idle = loadAnimation("Images/Prince_Animations/Prince_facing_Right/Prince_Idle/Idle_1.png",
                             "Images/Prince_Animations/Prince_facing_Right/Prince_Idle/Idle_2.png",
                             "Images/Prince_Animations/Prince_facing_Right/Prince_Idle/Idle_2.png");

 prince_throw = loadAnimation("Images/Prince_Animations/Prince_facing_Right/Prince_Throw/Throw_1.png",
                              "Images/Prince_Animations/Prince_facing_Right/Prince_Throw/Throw_2.png");

 sheild = loadImage("Images/sheild.png");
 javlinimg = loadImage("Images/javlin.png");
 blastA = loadAnimation("Images/Blast_Animation/Blast_1.png","Images/Blast_Animation/Blast_2.png",
                        "Images/Blast_Animation/Blast_3.png","Images/Blast_Animation/Blast_4.png",
                       "Images/Blast_Animation/Blast_5.png","Images/Blast_Animation/Blast_6.png",
                       "Images/Blast_Animation/Blast_7.png","Images/Blast_Animation/Blast_8.png");

 enemyA = loadAnimation("Images/Enemy_Animations/Enemy0.png","Images/Enemy_Animations/Enemy1.png",
                        "Images/Enemy_Animations/Enemy2.png","Images/Enemy_Animations/Enemy3.png",
                        "Images/Enemy_Animations/Enemy4.png","Images/Enemy_Animations/Enemy5.png",);

 PA = loadImage("Images/princess.png");

 //MENU
 tittle_img = loadImage("Images/UI elements/Text Elements/Tittle.png");
 PBI = loadImage("Images/UI elements/Buttons/Play_Button.png");
 HTPi = loadImage("Images/UI elements/Buttons/How to play_Button.png");
 stbi = loadImage("Images/UI elements/Buttons/Story_Button.png");

 BlastS = loadSound("Audio/Blast_sound.wav");
 KillS = loadSound("Audio/Kill_sound.wav");
 Throw_FB_sound = loadSound("Audio/Throw_FB_sound.wav");

 tittle_img = loadImage("Images/UI elements/Text Elements/Tittle.png");
 
 storyimg = loadImage("Images/UI elements/Text Elements/Story.png");
 
}
 
 function setup(){
     var canvas = createCanvas(1200,600);
     princess = createSprite(1138,410,9,9);
     princess.addImage(PA);
     princess.scale = 0.08;
     castle = createSprite(1100,450,20,20);
     castle.addImage("castle",ci);
     castle.scale = 1.5;
     prince = createSprite(0,325);
     prince.addAnimation("prince",Prince_idle);
     prince.scale = 0.15;
     tower = createSprite(308,278,20,20);
     tower.addImage("tower",ti);
     tower.scale = 0.7;
     shooter = createSprite(tower.x+20,tower.y-2,20,20);
     shooter.addImage("shooter",si);
     shooter.scale = 0.4;
     fbg = new Group();
     jg = new Group();
     enemy_Group = new Group();
     plifes = 5;
     tlifes = 5;

     //Menu
     Tittle = createSprite(width/2,50,2,2);
     Tittle.addImage("tittle",tittle_img);
     Tittle.visible = false;
     Play_button = createSprite(width/2,(height/2-150)+50,2,2);
     Play_button.addImage("PB",PBI);
     Play_button.visible = false;
     story_Button = createSprite(width/2,(height/2)+50,2,2);
     story_Button.addImage("stbi",stbi);
     story_Button.visible = false;
     HTP_Button = createSprite(width/2,(height/2+150)+50,2,2);
     HTP_Button.addImage("htbi",HTPi);
     HTP_Button.visible = false;
     story = createSprite(width/2,height/2,20,20);
     story.addImage(storyimg);
     story.visible = false;
 }
 
 function draw(){
     background(bg);
     edge = createEdgeSprites();
     prince.bounceOff(edge);
     prince.velocityX = 0;
     prince.velocityY = 0;

     if(gameState===PLAY){
     prince.visible = true;
     enemy_Group.setvisibleEach = true;
     tower.visible = true;
     if(shooter){
     shooter.visible = true;
     }
     princess.visible = true;
     Tittle.visible = false;
     story.visible = false;
     getKey();
     for (var i = 0; i<fbg.length; i++){
     if(prince.isTouching(fbg.get(i))){
        fbg.get(i).destroy();
         if(! keyIsDown(90)){
         death();
         }
     }
     }

     if(enemy_Group.length>0){
     for(var e = 0; e<enemy_Group.length; e++){
         for(var j = 0; j<jg.length; j++){
             if(jg.get(j).isTouching(enemy_Group.get(e))){
                 jg.get(j).destroy();
                 enemy_Group.get(e).destroy();
             }
         }
     }
}
for (var i = 0; i<jg.length; i++){
    if(tower.isTouching(jg.get(i))){
    jg.get(i).destroy();
    tlifes = tlifes-1;
    }
}

if(tlifes===0){
    tower.destroy();
    if(shooter)
    shooter.destroy();
    
    shooter = null;
    blast1 = createSprite(tower.x,tower.y,10,10);
    blast1.addAnimation("blast",blastA);
    setTimeout(() => { 
        blast1.destroy(); 
        tlifes= -1;
        console.log(tlifes);
        blast1.destroy();
        blast1 = null;
    }, 2000);
    console.log(tlifes);
   }

   if(shooter){
     shooter.pointTo(prince.x,prince.y);
    }

        for(var e = 0; e<enemy_Group.length; e++){
            if(prince.isTouching(enemy_Group.get(e))){
                death();
            }

            for(var j = 0; j<jg.length; j++){
                if(jg.get(j).isTouching(edge)){
                    jg.get(j).destroy();
                }
            }
 }}
 else{
     if(gameState===END){
         enemy_Group.setVelocityEach(0,0);
         jg.destroyEach();
     }else{
         if(gameState===MENU){
            prince.visible = false;
            enemy_Group.setvisibleEach = false;
            tower.visible = false;
            shooter.visible = false;
            princess.visible = false;
            Tittle.visible = true;
            Play_button.visible = true;
            story_Button.visible = true;
            HTP_Button.visible =true;
            if(mouseIsOver(Play_button)){
                Play_button.scale = 1.15;
                if(mousePressedOver(Play_button)){
                  gameState = PLAY;
                  Tittle.visible = false;
                  Play_button.visible = false;
                  story_Button.visible = false;
                  HTP_Button.visible = false;
                  showstory = false;
                  showHTP = false;
                }
            }else{
                Play_button.scale = 1.0;
            }
            if(mouseIsOver(story_Button)){
                story_Button.scale = 1.15;
                if(mousePressedOver(story_Button)){
                    showstory = true;
                  }
            }else{
                story_Button.scale = 1.0;
            }
            if(mouseIsOver(HTP_Button)){
                HTP_Button.scale = 1.15;
                if(mousePressedOver(HTP_Button)){
                    showHTP = true;
                  }
            }else{
                HTP_Button.scale = 1.0;
            }

             if(showstory === true){
                 story.visible = true;
                 if(mousePressedOver(story)){
                     showstory = false;
                 }
             }else{
                if(showstory === false){
                    story.visible = false;
                }
             }

         }
     }
 }
 drawSprites();
 //90 === z;
 if(gameState===PLAY){
 if(keyIsDown(90)){
    imageMode(CENTER);
    image(sheild,prince.x,prince.y,35,40);
    }

     if(frameCount%30===0 && shooter!==null){
         shoot();
     }
     if(frameCount%45===0){
        spawnEnemy();
    }
}
     textSize(24);
     fill(0,255,255);
     text("X:"+mouseX+","+"Y:"+mouseY,mouseX,mouseY);
    }

     function shoot(){
     fireball = createSprite(shooter.x,shooter.y,20,20);
     fireball.lifetime = 100;
     fireball.addImage("fireball",fi);
     fireball.scale = 0.15;
     fireball.velocityX = 8;
     fireball.velocityY = 8;
     fireball.rotateToDirection=true;
     fireball.pointTo(prince.x,prince.y);
     fireball.depth = shooter.depth-1;
     fbg.add(fireball);
     }
 
 function death(){
  plifes = plifes-1;
  if(plifes>=0){
  respawn();
 }else{
     if(plifes<0){
         gameState = END;
     }
 }
 }
 
 function respawn(){
  prince.x = 0
  prince.y = 325;
 }
 
 function throwJavlin(){
     if(frameCount%2===0){
     prince.addAnimation("throw", prince_throw);
     javlin = createSprite(prince.x+100,prince.y,20,20);
     javlin.lifetime = 100;
     javlin.addImage(javlinimg);
     javlin.scale = 0.15;
     javlin.velocityX = 16;
     jg.add(javlin);
 }
}
 
 function keyPressed(){
     if(gameState===PLAY){
    if(keyCode===71){
        throwJavlin();
    }
}
 }

    function getKey(){
    if(! keyIsDown(90)){
        // 87 = up
    if(keyDown(87)){
        prince.velocityY = -5;
        prince.changeAnimation("prince",Prince_Right_run);
    }
    // 83 = down
    if(keyDown(83)){
        prince.velocityY = 5;
        prince.changeAnimation("prince",Prince_Left_run);
    }
    if(keyDown(68)){
        prince.velocityX = 5;
        prince.addAnimation("prince",Prince_Right_run);
    }
    if(keyDown(65)){
        prince.velocityX = -5;
        prince.addAnimation("prince",Prince_Left_run);
    }
    if(! keyDown(87)){
        prince.changeAnimation("prince",Prince_idle);
    }
    // 83 = down
    if(! keyDown(83)){
        prince.changeAnimation("prince",Prince_idle);
    }
    if(! keyDown(68)){
        prince.addAnimation("prince",Prince_idle);
    }
    if(! keyDown(65)){
        prince.addAnimation("prince",Prince_idle);
    }
    
    }
    }

    function spawnEnemy(){
        if(gameState===PLAY){
    enemy = createSprite(1500,prince.y);
    enemy.addAnimation("enemy",enemyA);
    enemy.velocityX = -8;
    enemy.scale = 0.25;
    enemy_Group.add(enemy);
    }
}