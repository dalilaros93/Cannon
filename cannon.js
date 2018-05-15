var cannonPosX=80;  
var cannonPosY=getScreenCenterY()*2-100;
var speed=100;
var  gravity=9.81;
var lock=false;



var pos1 = cannonPosX+30;
var pos2 = cannonPosY-5;

var pos3 = cannonPosX;
var pos4 = cannonPosY-50;

d3.select("body").append("h2").text("Rotate the barrel and then shoot.")
// d3.select("body").append("h2").text("and then shoot. Have fun!")

   // and then shoot. Have fun!")

var audio = new Audio('cannon_audio.mp3');

var svgContainer = d3.select("svg");


//palla
var ball=svgContainer.append("g").attr("id", "ball");
ball.attr("transform", "translate("+cannonPosX+","+cannonPosY+") rotate(0)")
    .append("circle").attr("r",15).attr("fill","black").attr("stroke","black").attr("stroke-width",3);

//ruota
var wheel = svgContainer.append("g").attr("id", "wheel");
wheel.attr("transform", "translate("+pos1+","+pos2+") rotate(0)")
    .append("circle").attr("r",60).attr("fill","black").attr("stroke","#696969").attr("stroke-width",1).attr("stroke-opacity", 0.7);

//canna
var onlybar=svgContainer.append("g");
cannonBar = onlybar.attr("id", "cannon").attr("transform", "translate("+pos3+","+pos4+") rotate(0)")
    .append("rect").attr("width", 200).attr("height", 80).attr("fill","black").attr("stroke","black").attr("stroke-width", 4).attr("opacity", 1).attr("stroke-opacity", 0.1); //attr("fill","#696969")

document.onkeydown = checkKey;

function checkKey(e) {


    e = e || window.event;

    if (e.keyCode == '38') {
        onlybar.transition()
            .duration(100).attr("transform",function(k){
            sub= d3.select(this).attr("transform");
            sub=sub.substring(sub.indexOf("rotate"));
            sub=sub.substring(sub.indexOf("(")+1,sub.indexOf(")"));
            sub=parseFloat(sub)-5;
            if(sub<-90)
                sub=parseFloat(sub)+5;
            return "translate("+pos3+","+pos4+") rotate("+sub+")"; 
        });
    }
    else if (e.keyCode == '40') {
        onlybar.transition()
            .duration(100).attr("transform",function(k){
            sub= d3.select(this).attr("transform");
            sub=sub.substring(sub.indexOf("rotate"));
            sub=sub.substring(sub.indexOf("(")+1,sub.indexOf(")"));
            sub=parseFloat(sub)+5;
            if(sub>0)
                sub=parseFloat(sub)-5;
            return "translate("+pos3+","+pos4+") rotate("+sub+")";  
        });

    }
    else if(e.keyCode === 32) {  
        if(!lock){
            lock=!lock;

            var sub= d3.select("#cannon").attr("transform");
            var sub2=sub.substring(sub.indexOf(",rotate(")-1);
            sub2=sub2.substring(sub.indexOf("("),sub.indexOf(")"));
            sub=sub.substring(sub.indexOf("translate"));
            sub=sub.substring(sub.indexOf("(")+1,sub.indexOf(")"));
            var angle =-1*parseFloat(sub2);
            angle=(toRadians(angle));


            var vx=speed*Math.cos(angle)
            var vy=speed*Math.sin(angle)
            var x;
            var y;
            var num=(speed)*Math.sin(angle);
            var t=2*(num)/(gravity)

            //t=Math.abs(t)
            fx=pos3+vx * t;
            fy=(-pos4+(vy * t -  gravity/2 * (t*t)));

            cond=-1;
            var i=0;




            function repeatMe()
            { 
                x =cannonPosX+vx * i;
                y =(-cannonPosY+(vy * i -  gravity/2 * (i*i)));
                x=Math.abs(x);
                y=Math.abs(y);

                ball.transition()
                    .duration(10).attr("transform",function(k){

                audio.play();
                    return "translate("+x+","+y+")";
                });

                i=i+0.2;

                if(i>t){
                    clearInterval(refreshIntervalId);
                    ball.transition().delay(100)
                        .duration(1000).attr("transform",function(k){
                        return "translate("+cannonPosX+","+cannonPosY+")";

                    });
                    lock=!lock;


                }
            }
            var refreshIntervalId = setInterval(repeatMe,20);
        }



    }
}
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}


function getScreenCenterY() {
    return(document.body.clientHeight/2)-25;
}

function getScreenCenterX() {
    return(document.body.clientWidth/2)-25;
}


