//Initialize objects / characters for the game
var mc, mob;

//Equivalent to setup, is called "onload" of the body in html
function startGame() {

    gameArea.create();
    mc = new component(30, 30, "blue", 10, 10);
    mob = new component(10, 10, "red", 500, 30);
}

//Constructor function for our game objects, right now it only draws rectangles which is a little flawed
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    //function belonging to the objects called componenets that redraws them
    this.update = function(){
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//It is an object for the background canvas(but different to characters)

// Quote "The object myGameArea will have more properties and methods later in this tutorial.
//The function startGame() invokes the method start() of the myGameArea object.
//The start() method creates a <canvas> element and inserts it as the first childnode of the <body> element."
var gameArea = {
    canvas : document.createElement("canvas"),
    //function of the gameArea object called create
    create : function(){
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    //Function of the gameArea object called clear: erases the entire canvas space 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function updateGameArea(){
    gameArea.clear();
    mc.update();
    mob.update();
    mc.x += 1;
    mob.x -=1;
}