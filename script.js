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
        document.getElementById(fieldName).innerHTML=value.toFixed(10);
    }
}

var speed_x=0,speed_y=0;
var locat_x=0,locat_y=0;
var timer=0,last_timer=0;
var lowpass_x=0,highpass_x=0;
var lowpass_y=0,highpass_y=0;
var filter=0.9;
var old_ac_x=0,old_ac_y=0;
var old_speed_x=0,old_speed_y=0;

function clock(){
    timer++;
}
setInterval(clock,1);

function handleMotion(event){
    var ac_x=event.acceleration.x;
    var ac_y=event.acceleration.y;
    var int=(timer-last_timer)/1000;

    lowpass_x=lowpass_x*filter+ac_x*(1-filter);
    highpass_x=ac_x-lowpass_x;
    speed_x=((highpass_x+old_ac_x)*int)/2+speed_x;
    old_ac_x=highpass_x;
    locat_x=((speed_x+old)*int)/2+locat_x;
    old_speed_x=speed_x;

    lowpass_y=lowpass_y*filter+ac_y*(1-filter);
    highpass_y=ac_y-lowpass_y;
    speed_y=((highpass_y+old_ac_y)*int)/2+speed_y;
    old_ac_y=highpass_y;
    locat_y=((speed_y+old)*int)/2+locat_y;
    old_speed_y=speed_y;

    alert("");

    updateFieldIfNotNull("accel_x",ac_x);
    updateFieldIfNotNull("accel_y",ac_y);
    updateFieldIfNotNull("speed_x",speed_x);
    updateFieldIfNotNull("speed_y",speed_y);
    updateFieldIfNotNull("locat_x",locat_x);
    updateFieldIfNotNull("locat_y",locat_y);
    updateFieldIfNotNull("interval",int);
    last_timer=timer;
}