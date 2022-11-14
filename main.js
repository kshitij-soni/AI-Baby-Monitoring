img="";
status="";
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function modelLoaded(){
    console.log('Success');
    status=true;
    
}

function gotResult(error, results){
    if(error){console.log(error);}
    console.log(results);
    objects=results;
}

function preload(){
    song= loadSound('danger_alarm.mp3');

}

function draw(){
    image(video,0,0,380,380);

if(status !=""){
    objectDetector.detect(video, gotResult);

    r=random(255);
    g=random(255);
    b=random(255);
    Check=false;
for(i=0;i<objects.length;i++){
    if(objects[i].label=="person"){
        Check=true; 
}   
    fill(r,g,b);
    percent= floor(objects[i].confidence * 100);
    text(objects[i].label +" "+ percent + "%", objects[i].x+15,objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
if(Check==true){
   document.getElementById("status").innerHTML="Baby Present";
   song.stop();
}else{
   document.getElementById("status").innerHTML="Baby Absent";
   song.play();
}
}
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: Detecting Object";
}