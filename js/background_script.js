$(window).on('load', function() {

    var canvas = $("#canvas-screen-display")[0];
    var context = canvas.getContext("2d");
    var mouseObj = {
        x: 0,
        y: 0
    }

    var backgroundcolor = "#000000",
        dotcolor = "#646464",
        linecolor = "#4A4A4A";

    var circles = {},
        cid = 0;

    function resizeCanvas(){
        //context.translate(0.125, 0.125);
        canvas.width = $('#content-container').width();
        canvas.height = $('#content-container').height();
    }
    window.addEventListener('resize', resizeCanvas, false);

    function setupScreen(){
        resizeCanvas();

        //Fill background black
        context.fillRect(0, 0, canvas.width, canvas.height);

        //create details for the circles
        //Web Stuff
        for(var i = 0; i < 20; i++){
            new CircleObj();
        }
    }

    function CircleObj(){
        this.posX = Math.floor((Math.random() * (canvas.width-50)) + 50);
        this.posY = Math.floor((Math.random() * (canvas.height-50)) + 50);

        var plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
        var plusOrMinusY = Math.random() < 0.5 ? -1 : 1;

        this.velX = 0;
        this.velY = (Math.random() / 2) * plusOrMinusY;

        this.radius = 3;

        cid++;
        circles[cid] = this;
        this.id = cid;
    }

    CircleObj.prototype.draw = function () {
        //move circles
        this.posX += this.velX;
        this.posY += this.velY;
        //check if out of bounds
        if((this.posX - this.radius) <= 0){
            this.velX = -this.velX;
            this.posX = this.radius + 1;
        }
        else if((this.posX + this.radius) >= canvas.width){
            this.velX = -this.velX;
            this.posX = canvas.width - this.radius - 1;
        }

        if((this.posY - this.radius) <= 0){
            this.velY = -this.velY;
            this.posY = this.radius + 1;
        }
        else if((this.posY + this.radius) >= canvas.height){
            this.velY = -this.velY;
            this.posY = canvas.height - this.radius - 1;
        }

        context.beginPath();
        context.fillStyle = dotcolor;
        context.arc(this.posX,this.posY,this.radius,0,Math.PI*2, false); // outer (filled)
        //context.arc(this.posX,this.posY,this.radius-1,0,Math.PI*2, true); // inner (unfills it)
        context.closePath();
        context.fill();
    }

    function drawScreen(){
        //Reset Screen
        context.fillStyle = backgroundcolor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        var tmpx = 0, tmpy = 0;
        //go through each circles
        for(var i in circles){
            //get curr x and y
            tmpx = circles[i].posX;
            tmpy = circles[i].posY;

            //go through circles again
            for(var j in circles){
                //select those after curr
                if(j > i){
                    //calculate distance between the points
                    var edist = Math.sqrt(Math.pow((tmpx - circles[j].posX), 2) + Math.pow((tmpy - circles[j].posY), 2));

                    //if distance is smaller than ... then draw a line
                    if(edist < 200 && edist > -200){
                        context.beginPath();
                        context.strokeStyle = linecolor;
                        context.moveTo(tmpx+0.5,tmpy+0.5);
                        context.lineTo(circles[j].posX,circles[j].posY);
                        context.closePath();

                        context.stroke();
                    }
                }
            }
        }

        for(var i in circles){
            tmpx = circles[i].posX;
            tmpy = circles[i].posY;

            //calculate distance between the points
            var edist = Math.sqrt(Math.pow((tmpx - mouseObj.x), 2) + Math.pow((tmpy - mouseObj.y), 2));

            //if distance is smaller than ... then draw a line
            if(edist < 200 && edist > -200){
                context.beginPath();
                context.strokeStyle = linecolor;
                context.moveTo(tmpx+0.5,tmpy+0.5);
                context.lineTo(mouseObj.x,mouseObj.y);
                context.closePath();

                context.stroke();

                context.beginPath();
                context.fillStyle = dotcolor;
                context.arc(mouseObj.x,mouseObj.y,2,0,Math.PI*2, false); // outer (filled)
                //context.arc(this.posX,this.posY,this.radius-1,0,Math.PI*2, true); // inner (unfills it)
                context.closePath();
                context.fill();
            }
        }

        for(var i in circles){
            circles[i].draw();
        }
    }

    setupScreen();
    setInterval(drawScreen, 10);

    console.log("Loaded Background JS");
});
