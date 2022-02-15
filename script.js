var is_runnning=false;
function start(){
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
function handleMotion(event){
    alert("")
    updateFieldIfNotNull("accel_x",event.acceleration.x);
    updateFieldIfNotNull("accel_y",event.acceleration.y);
}