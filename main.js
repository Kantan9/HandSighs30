prediction_1=""


Webcam.set({
    width:296,
    height:300,
    image_format:'png',
    png_quality:90

});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="capture_img" src="'+data_uri+'"/>';    
    });
}

console.log("ml5version:",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/x0GZiFb1p/model.json',modelLoaded);

function modelLoaded()
{
    console.log('modelLoaded!');
}

function speak()
{
    var synth=window.speechSynthesis;
    speak_data_1="the prediction is"+prediction_1;
    utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById("capture_img");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction_1=results[0].label;
         speak();
        if(results[0].label=="stop")
        {
            document.getElementById("update_emoji").innerHTML="&#9995;";
        }

        if(results[0].label=="victory")
        {
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }

        if(results[0].label=="best")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
    }
}
