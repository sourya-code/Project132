Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

    camera = document.getElementById("camera");
    Webcam.attach( '#camera' );

    function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

    console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9LTAETdRX/model.json', modelLoaded);

    function modelLoaded() {
        console.log('Model Loaded!');
    }

    function speak(){
        var synth = window.speechSynthesis;
        speak_data_1 = "The prediction is " + prediction_1;
        var utterThis = newSpeechSynthesisUtterance(speak_data_1);
        synth.speak(utterThis);
    }

    function check()
    {
        img = document.getElementById('captured_image');
        classifier.classify(img, gotResults);
    }

    function gotResults(error, results) {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("result_gesture_name").innerHTML = results[1].label;
            speak();
          if(results[1].label == happy)
          {
            document.getElementById("update_gesture").innerHTML = "&#128076;";
          }
          if(results[1].label == sad)
          {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
          }
          if(results[1].label == angry)
          {
            document.getElementById("update_gesture").innerHTML = "&#9996";
          }
        }
    }