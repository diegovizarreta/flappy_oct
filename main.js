//canvas
var canvas = document.getElementById('c')
var ctx = canvas.getContext('2d')
//variables
var interval
var frames
var images = {
    bg: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
    flappy: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
    logo: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true",
    obstacle_bottom: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
    obstacle_top: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"
}
//clases
function Board(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bg
    //this.image.onload = ()=>this.draw()
    this.draw = function(){
        this.x--
        if(this.x < -this.width) this.x = 0
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
    }
}

function Flappy(){
    Board.call(this)
    this.x = 100
    this.y = 200
    this.width = 40
    this.height = 30
    this.image.src = images.flappy
    //this.image.onload = ()=>this.draw()
    this.draw = function(){
        this.boundaries()
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    this.boundaries = function(){
        if(this.y+this.height > canvas.height-10) {
            this.y = canvas.height-this.height
        }
        else if(this.y < 10 ) {
            this.y = 10
        }
        else this.y*=1.01

    }
}

//instances
var bg = new Board()
var flappy = new Flappy()
//main functions
function start(){
    if(!interval) interval = setInterval(update,1000/60)
}
function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    bg.draw()
    flappy.draw()
}
function gameOver(){}

//aux functions
function drawCover(){
    var img = new Image()
    img.src = images.logo
    img.onload = function(){
        bg.draw()
        ctx.drawImage(img, 50,100,300,100)
        ctx.font = "bold 24px Avenir"
        ctx.fillText("Presiona la tecla 'Return' para comenzar", 50,300)
    }
}

//listeners
addEventListener('keyup',function(e){
    switch(e.keyCode){
        case 13:
            return start()
        default:
            return
    }
} )

addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 32:
            flappy.y -=40
            return
        default:
            return
    }
} )

drawCover()

