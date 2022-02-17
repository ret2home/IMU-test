var is_runnning=false;
function start(){
    if(DeviceMotionEvent&&typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission();
    }
    if(!is_runnning){
        window.addEventListener("devicemotion",handleMotion);
        document.getElementById("start_button").innerHTML="Stop";
        is_runnning=true;
        last_timer=timer;
    }else{
        window.removeEventListener("devicemotion",handleMotion);
        document.getElementById("start_button").innerHTML="Start";
        is_runnning=false;
    }
}

function updateFieldIfNotNull(fieldName,value){
    if(value!=null){
        var res=String(value.toFixed(2));
        if(res[0]!="-"){
            document.getElementById(fieldName).classList.remove("red");
            document.getElementById(fieldName).classList.add("green");
        }else{
            res=res.substr(1);
            document.getElementById(fieldName).classList.remove("green");
            document.getElementById(fieldName).classList.add("red");
        }
        document.getElementById(fieldName).innerHTML=res;
    }
}
var timer=0;
function clock(){
    timer++;
}
setInterval(clock,10);

var accel_x=[],accel_y=[],accel_z=[],tim=[];
function handleMotion(event){
    var ac_x=event.accelerationIncludingGravity.x;
    var ac_y=event.accelerationIncludingGravity.y;
    var ac_z=event.accelerationIncludingGravity.z;

    accel_x.push(ac_x);
    accel_y.push(ac_y);
    accel_z.push(ac_z);
    tim.push(timer);
    updateFieldIfNotNull("accel_x",ac_x);
    updateFieldIfNotNull("accel_y",ac_y);
    updateFieldIfNotNull("accel_z",ac_z);
}

function rand(){
    accel_x.push(Math.random()*19.6-9.8);
    accel_y.push(Math.random()*19.6-9.8);
    accel_z.push(Math.random()*19.6-9.8);
    tim.push(timer);
}
//setInterval(rand,100);

function draw(){
    if(!is_runnning)return;
    var canvas=document.getElementById("canvas");
    if(canvas.getContext){
        var ctx=canvas.getContext('2d');
        ctx.clearRect(0,0,800,600);
        ctx.beginPath();
        ctx.lineWidth="2";
        ctx.strokeStyle="Black";
        ctx.moveTo(0,300);
        ctx.lineTo(800,300);
        ctx.stroke();


        ctx.beginPath();
        ctx.lineWidth="0.5";
        ctx.strokeStyle="Black";
        ctx.moveTo(0,150);
        ctx.lineTo(800,150);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth="0.5";
        ctx.strokeStyle="Black";
        ctx.moveTo(0,450);
        ctx.lineTo(800,450);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="Red";
        if(accel_x.length){
            let lasy=0;
            for(let i=accel_x.length-1;i>=0;i--){
                let x=800-(tim[tim.length-1]-tim[i])/100*160;
                if(x<0)break;
                let y=-accel_x[i]/9.8*150+300;
                if(i==accel_x.length-1){
                    ctx.moveTo(x,y);
                }else{
                    ctx.lineTo(x,y);
                }
            }
        }
        ctx.stroke();


        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="Green";
        if(accel_x.length){
            let lasy=0;
            for(let i=accel_x.length-1;i>=0;i--){
                let x=800-(tim[tim.length-1]-tim[i])/100*160;
                if(x<0)break;
                let y=-accel_y[i]/9.8*150+300;
                if(i==accel_x.length-1){
                    ctx.moveTo(x,y);
                }else{
                    ctx.lineTo(x,y);
                }
            }
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="Blue";
        if(accel_x.length){
            let lasy=0;
            for(let i=accel_x.length-1;i>=0;i--){
                let x=800-(tim[tim.length-1]-tim[i])/100*160;
                if(x<0)break;
                let y=-accel_z[i]/9.8*150+300;
                if(i==accel_x.length-1){
                    ctx.moveTo(x,y);
                }else{
                    ctx.lineTo(x,y);
                }
            }
        }
        ctx.stroke();
    }
}
setInterval(draw,100);