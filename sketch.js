var dog,dog_Img;
var food_, food_Img;
var happyDog, happyDog_Img
var database = firebase.database();
var foodS = 20;
var lastFed = 0;
var foodStock;
var milk_1;
var food_Obj = null;

var button1, button2;


function preload()
{
dog_Img = loadImage("dogImg.png")
happyDog_Img = loadImage("dogImg1.png")

}

function setup() {
  createCanvas(1000, 400);
  
  foodObj = new Food();
  
  dog = createSprite(750,200,20,20);
  dog.scale = 0.15
  dog.addImage(dog_Img);
  dog.visible = true;

  happyDog = createSprite(700,210,20,20);
  happyDog.scale= 0.15;
  happyDog.addImage(happyDog_Img);
  happyDog.visible = false;

  button1=createButton("Feed the Dog");
  button1.position(850,60);
  button1.mousePressed(feedDog);
 
  button2 = createButton("Add Food");
  button2.position(950,60)
  button2.mousePressed(addFood);

  var title = createElement('h2')
  title.html("Virtual Pet")
  title.position(800, 0)
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
}

function draw() {  
background(46,139,87);

fill("white");
textSize(15);
if(lastFed>=12){
  text("Last Fed : "+ lastFed%12 + " PM", 350,25);
 }else if(lastFed==0){
   text("Last Fed : 12 AM",350,25);
 }else{
   text("Last Fed : "+ lastFed + " AM", 350,25);
 }

foodObj.display();
drawSprites();
 
}

function readStock(data){
foodS = data.val()
}

function writeStock(x){
if(x<=0){
x=0
}else{
x = x-1
}
database.ref('/').update({
Food:x
})
}

function addFood(){
  foodS++;
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  
  happyDog.visible = true;
  dog.visible = false;
  foodS--;
  foodObj.updateFoodStock(foodS);
  lastFed = hour();
  foodObj.updateLastFed(lastFed);
  
}