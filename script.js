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
var locat_x=0;
var locat_y=0;
function handleMotion(event){
    var ac_x=event.acceleration.x;
    var ac_y=event.acceleration.y;
    var int=event.interval/1000;
    var new_speed_x=speed_x+ac_x*int;
    var new_speed_y=speed_y+ac_y*int;
    locat_x+=(speed_x+new_speed_x)*int/2;
    locat_y+=(speed_y+new_speed_y)*int/2;
    speed_x=new_speed_x;
    speed_y=new_speed_y;
    updateFieldIfNotNull("accel_x",ac_x);
    updateFieldIfNotNull("accel_y",ac_y);
    updateFieldIfNotNull("speed_x",speed_x);
    updateFieldIfNotNull("speed_y",speed_y);
    updateFieldIfNotNull("locat_x",locat_x);
    updateFieldIfNotNull("locat_y",locat_y);
    updateFieldIfNotNull("interval",int);
}