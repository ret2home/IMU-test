var is_runnning=false;
function start(){
    if(DeviceMotionEvent&&typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission();
    }
    if(!is_runnning){
        window.addEventListener("devicemotion",handleMotion);
        document.getElementById("start_button").innerHTML="Stop";
        is_runnning=true;
        last_Date.now()=Date.now();
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

var accel_x=[],accel_y=[],accel_z=[],tim=[],mnlis=[];
var nex_check=0;
function handleMotion(event){
    var ac_x=event.accelerationIncludingGravity.x;
    var ac_y=event.accelerationIncludingGravity.y;
    var ac_z=event.accelerationIncludingGravity.z;

    accel_x.push(ac_x);
    accel_y.push(ac_y);
    accel_z.push(ac_z);
    tim.push(Date.now());

    while(nex_check<accel_x.length&&tim[nex_check]<Date.now()-250){
        var l=nex_check,mxl=accel_y[nex_check];
        var r=nex_check,mxr=mxl;
        var mn=mxl,mnidx=nex_check;
        while(l>0&&tim[l-1]>tim[nex_check]-250){
            mxl=Math.max(mxl,accel_y[l-1]);
            if(accel_y[l-1]<mn){
                mn=accel_y[l-1];
                mnidx=l-1;
            }
            l--;
        }
        while(r<accel_x.length-1&&tim[r+1]<tim[nex_check]+250){
            mxr=Math.max(mxr,accel_y[r+1]);
            if(ac_y[r+1]<mn){
                mn=accel_y[r+1];
                mnidx=r+1;
            }
            r++;
        }
        if(mnidx==nex_check&&mxl-mn>=0.8&&mxr-mn>=0.8){
            mnlis.push(nex_check);
        }
        nex_check++;
    }
    updateFieldIfNotNull("accel_x",ac_x);
    updateFieldIfNotNull("accel_y",ac_y);
    updateFieldIfNotNull("accel_z",ac_z);
    updateFieldIfNotNull("timer",tim.length);
}

function rand(){
    accel_x.push(Math.random()*19.6-9.8);
    accel_y.push(Math.random()*19.6-9.8);
    accel_z.push(Math.random()*19.6-9.8);
    tim.push(Date.now());
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
                let x=800-(Date.now()-tim[i])/1000*100;
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
            for(let i=accel_x.length-1;i>=0;i--){

                let x=800-(Date.now()-tim[i])/1000*100;
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
                let x=800-(Date.now()-tim[i])/1000*100;
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

        for(var i=mnlis.length-1;i>=0;i--){
            var id=mnlis[i];
            if(tim[id]<Date.now()-2000){
                if((!i||tim[mnlis[i-1]]<tim[id]-1000)&&(i==mnlis.length-1||tim[id]+1000<tim[mnlis[i+1]])){
                    mnlis.splice(i,1);
                    continue;
                }
            }
            let x=800-(Date.now()-tim[id])/1000*100;
            if(x<0)break;
            let y=-accel_y[id]/9.8*150+300;
            ctx.beginPath();
            ctx.lineWidth="3";
            ctx.strokeStyle="Red";
            ctx.arc(x,y,10,0,2*Math.PI);
            ctx.stroke();
        }
    }
}
setInterval(draw,50);