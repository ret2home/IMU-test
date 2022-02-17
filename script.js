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
    var ac_x=event.acceleration.x;
    var ac_y=event.acceleration.y;
    var ac_z=event.acceleration.z;

    accel_x.push(ac_x);
    accel_y.push(ac_y);
    accel_z.push(ac_z);
    updateFieldIfNotNull("accel_x",ac_x);
    updateFieldIfNotNull("accel_y",ac_y);
    updateFieldIfNotNull("accel_z",ac_z);
}


function draw(){
    var canvas=document.getElementById("canvas");
    if(canvas.getContext){
        var ctx=canvas.getContext('2d');
        ctx.clearRect(0,0,800,400);
        ctx.beginPath();
        ctx.lineWidth="2";
        ctx.strokeStyle="Black";
        ctx.moveTo(0,200);
        ctx.lineTo(1000,200);
        ctx.stroke();


        ctx.beginPath();
        ctx.lineWidth="0.5";
        ctx.strokeStyle="Black";
        ctx.moveTo(0,100);
        ctx.lineTo(1000,100);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth="0.5";
        ctx.strokeStyle="Black";
        ctx.moveTo(0,300);
        ctx.lineTo(1000,300);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="Red";
        if(accel_x.length){
            let lasy=0;
            for(let i=accel_x.length-1;i>=0;i--){
                let x=800-(tim[tim.length-1]-tim[i])/100*60;
                if(x<0)break;
                let y=-accel_x[i]*9.8+200;
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