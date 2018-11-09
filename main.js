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
//instances
var bg = new Board()
//main functions
function start(){
    interval = setInterval(update,1000/60)
}
function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    bg.draw()
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

drawCover()

