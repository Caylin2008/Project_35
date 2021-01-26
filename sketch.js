//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogImg1,dogImg2;

function preload()
{
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  
  dog = createSprite(260,270,50,50);
  dog.addImage(dogImg1);
  dog.scale=0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }

  textSize(15);
  stroke("black");
  fill("black");
  text("Press UP Arrow to Feed Drago Milk",130,10);
  text("Food Remaining: "+foodS,170,200)
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


