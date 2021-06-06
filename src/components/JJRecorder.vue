<style scoped>
a {
  color: #337ab7;
}
p {
  margin-top: 1rem;
}
a:hover {
  color:#23527c;
}
a:visited {
  color: #8d75a3;
}

body {
	line-height: 1.5;
	font-family: sans-serif;
	word-wrap: break-word;
	overflow-wrap: break-word;
	color:black;
	margin:2em;
}

h1 {
	text-decoration: underline red;
	text-decoration-thickness: 3px;
	text-underline-offset: 6px;
	font-size: 220%;
	font-weight: bold;
}

h2 {
	font-weight: bold;
	color: #005A9C;
	font-size: 140%;
	text-transform: uppercase;
}

red {
	color: red;
}

#controls {
  display: flex;
  margin-top: 2rem;
  max-width: 28em;
  margin-bottom: 55px;
} 

#recordButton{
  height: 200px;
  width: 200px;
  cursor: pointer;
}
#stopButton{
  height: 200px;
  width: 200px;
  cursor: pointer;
}
#pauseButton{
  width:40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.25);
  margin-bottom: 35px;
  cursor: pointer;
}
button:active {
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
  line-height: 3rem;
}

button:disabled {
  pointer-events: none;
  background: lightgray;
}
button:first-child {
  margin-left: 0;
}

audio {
  display: block;
  width: 100%;
  margin-top: 0.2rem;
}

li {
  list-style: none;
  margin-bottom: 1rem;
}

#formats {
  margin-top: 0.5rem;
  font-size: 80%;
}

#recordingsList{
	max-width: 28em;
}

#div_{
  width: 100%;
  height: 30px
}
#audio_{
  height: 35px
}
</style>

<template>
    <div class="d-flex flex-column align-items-center" style="width: 320px;">
      {{Seconds / 10}}
        <div id="controls">
            <img v-if="!recording" id="recordButton" src="@/assets/images/icon/record-play.png" @click="startRecording"/>
            <img v-else id="stopButton" src="@/assets/images/icon/record-stop.png" @click="stopRecording"/>
        </div>
        <img id="pauseButton" src="@/assets/images/icon/record-pause.png" @click="pauseRecording"/>
        
        <div id="div_">
          <audio id="audio_" controls src=""></audio>
        </div>
    </div>
</template>
<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
<script>
export default{
    name: "JJRecorder",
    data: function(){
        return {
            recordingPaused: false,
            recording: false,
            URL: null,
            gumStream: null,
            rec: null,
            input: null,
            AudioContext: null,
            audioContext: null,
            recordButton: null,
            stopButton: null,
            pauseButton: null,
            blob: null,
            au: null,
            div: null,
            myVar: null,
            Seconds: 0
        }
    },
    methods:{
        startTimer() { 
            this.myVar = setInterval(this.start ,100);
            this.Seconds = 0;
        },

        resumeTimer() {    
            this.myVar = setInterval(this.start ,100);
        },

        start() {
            this.Seconds++;
        },

        stopTimer() {
            clearInterval(this.myVar)
        },

        startRecording() {
            this.recording = true
            console.log("recordButton clicked");

            /*
                Simple constraints object, for more advanced audio features see
                https://addpipe.com/blog/audio-constraints-getusermedia/
            */
                
            const constraints = { audio: true, video:false }
            /*
                Disable the record button until we get a success or fail from getUserMedia() 
            */

            this.pauseButton.disabled = false
            const vm = this
                /*
                    We're using the standard promise based getUserMedia() 
                    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
                */
            
            this.startTimer()
            navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
                
                /*
                    create an audio context after getUserMedia is called
                    sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
                    the sampleRate defaults to the one set in your OS for your playback device
                */
                vm.audioContext = new AudioContext();
                
                //update the format 
                // document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+vm.audioContext.sampleRate/1000+"kHz"

                /*  assign to gumStream for later use  */
                vm.gumStream = stream;
                
                /* use the stream */
                vm.input = vm.audioContext.createMediaStreamSource(stream);

                /* 
                Create the Recorder object and configure to record mono sound (1 channel)
                Recording 2 channels  will double the file size
                */
                vm.rec = new Recorder(vm.input,{numChannels:1})

                //start the recording process
                vm.rec.record()

                console.log("Recording started");

            }).catch(function(err) {
                //enable the record button if getUserMedia() fails
                vm.pauseButton.disabled = true
            });
        },
        pauseRecording(){
            if(this.recording){
              this.recordingPaused = !this.recordingPaused;
              console.log("pauseButton clicked rec.recording=",this.rec.recording );
              if (this.rec.recording){
                  //pause
                  this.rec.stop();
                  this.stopTimer()
                  pauseButton.innerHTML="Resume";
              }else{
                  //resume
                  this.rec.record()
                  this.resumeTimer();
                  pauseButton.innerHTML="Pause";

              }
            }
        },
        stopRecording() {
            this.stopTimer()
            this.recording = false;
            console.log("stopButton clicked");

            //disable the stop button, enable the record too allow for new recordings
            this.pauseButton.disabled = true;

            //reset button just in case the recording is stopped while paused
            this.pauseButton.innerHTML="Pause";
            
            //tell the recorder to stop the recording
            this.rec.stop();

            //stop microphone access
            this.gumStream.getAudioTracks()[0].stop();

            //create the wav blob and pass it on to createDownloadLink
            this.rec.exportWAV(this.createDownloadLink);
        },
        createDownloadLink(blob) {
            this.blob = blob
            this.$emit('update', this.blob);
            const url = this.URL.createObjectURL(blob);
            // const link = document.createElement('a');

            //name of .wav file to use during upload and download (without extendion)
            const filename = new Date().toISOString();

            //add controls to the <audio> element
            this.au.controls = true;
            this.au.src = url;

            //save to disk link
            // link.href = url;
            // link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
            // link.innerHTML = "Save to disk";

            //add the new audio element to li
            this.div.appendChild(this.au);
            
            //add the filename to the li
            // li.appendChild(document.createTextNode(filename+".wav "))

            //add the save to disk link to li
            // li.appendChild(link);
            
            //upload link
            // const upload = document.createElement('a');
            // upload.href="#";
            // upload.innerHTML = "Upload";
            // upload.addEventListener("click", function(event){
            //     const xhr=new XMLHttpRequest();
            //     xhr.onload=function(e) {
            //         if(this.readyState === 4) {
            //             console.log("Server returned: ",e.target.responseText);
            //         }
            //     };
            //     const fd=new FormData();
            //     fd.append("audio_data",blob, filename);
            //     xhr.open("POST","upload.php",true);
            //     xhr.send(fd);
            // })
            // li.appendChild(document.createTextNode (" "))//add a space in between
            // li.appendChild(upload)//add the upload link to li

            //add the li element to the ol
        }
    },
    mounted(){
        this.recordButton = document.getElementById("recordButton");
        this.stopButton = document.getElementById("stopButton");
        this.pauseButton = document.getElementById("pauseButton");
        this.URL = window.URL || window.webkitURL
        this.AudioContext = window.AudioContext || window.webkitAudioContext
        this.au = document.getElementById("audio_");
        this.div = document.getElementById("div_");
    }
}
</script>
