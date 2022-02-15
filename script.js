var is_runnning=false;
function start(){
    if(DeviceMotionEvent&&typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission();
    }
    if(!is_runnning){
        window.addEventListener("devicemotion",handleMotion);
        document.getElementById("start_button").innerHTML="Stop";
        is_runnning=true;
    }else{
        window.removeEventListener("devicemotion",handleMotion);
        document.getElementById("start_button").innerHTML="Start";
        is_runnning=false;
    }
}

function updateFieldIfNotNull(fieldName,value){
    if(value!=null){
        document.getElementById(fieldName).innerHTML=value.toFixed(10);
    }
}

var speed_x=0;
var speed_y=0;
function handleMotion(event){
    updateFieldIfNotNull("accel_x",event.acceleration.x);
    updateFieldIfNotNull("accel_y",event.acceleration.y);
    updateFieldIfNotNull("interval",event.interval);
}