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
} 

button {
  flex-grow: 1;
  height: 3.5rem;
  min-width: 2rem;
  border: none;
  border-radius: 0.15rem;
  background: #ed341d;
  margin-left: 2px;
  box-shadow: inset 0 -0.15rem 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#ffffff;
  font-weight: bold;
  font-size: 1.5rem;
}

button:hover, button:focus {
  outline: none;
  background: #c72d1c;
}

button::-moz-focus-inner {
  border: 0;
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
</style>

<template>
    <div>
        <div id="controls">
            <button id="recordButton" @click="startRecording">Record</button>
            <button id="pauseButton" @click="pauseRecording">Pause</button>
            <button id="stopButton" @click="stopRecording">Stop</button>
        </div>
        <div id="formats">Format: start recording to see sample rate</div>
        <p><strong>Recordings:</strong></p>
        <ol id="recordingsList"></ol>
    </div>
</template>
<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
<script>
export default{
    name: "JJRecorder",
    data: function(){
        return {
            test: 3,
            URL: null,
            gumStream: null,
            rec: null,
            input: null,
            AudioContext: null,
            audioContext: null,
            recordButton: null,
            stopButton: null,
            pauseButton: null
        }
    },
    methods:{
        startRecording() {
            console.log("recordButton clicked");

            /*
                Simple constraints object, for more advanced audio features see
                https://addpipe.com/blog/audio-constraints-getusermedia/
            */
                
            const constraints = { audio: true, video:false }
            /*
                Disable the record button until we get a success or fail from getUserMedia() 
            */

            this.recordButton.disabled = true;
            this.stopButton.disabled = false;
            this.pauseButton.disabled = false
            const vm = this
                /*
                    We're using the standard promise based getUserMedia() 
                    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
                */
            
            navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
                
                console.log("0")
                /*
                    create an audio context after getUserMedia is called
                    sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
                    the sampleRate defaults to the one set in your OS for your playback device
                */
                vm.audioContext = new AudioContext();
                
                console.log("1")
                //update the format 
                document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+vm.audioContext.sampleRate/1000+"kHz"

                /*  assign to gumStream for later use  */
                vm.gumStream = stream;
                
                /* use the stream */
                vm.input = vm.audioContext.createMediaStreamSource(stream);

                console.log("2")
                /* 
                Create the Recorder object and configure to record mono sound (1 channel)
                Recording 2 channels  will double the file size
                */
                vm.rec = new Recorder(vm.input,{numChannels:1})

                console.log("3")
                //start the recording process
                vm.rec.record()

                console.log("Recording started");

            }).catch(function(err) {
                console.log(err)
                //enable the record button if getUserMedia() fails
                vm.recordButton.disabled = false;
                vm.stopButton.disabled = true;
                vm.pauseButton.disabled = true
            });
        },
        pauseRecording(){
            console.log("pauseButton clicked rec.recording=",this.rec.recording );
            if (this.rec.recording){
                //pause
                this.rec.stop();
                pauseButton.innerHTML="Resume";
            }else{
                //resume
                this.rec.record()
                pauseButton.innerHTML="Pause";

            }
        },
        stopRecording() {
            console.log("stopButton clicked");

            //disable the stop button, enable the record too allow for new recordings
            this.stopButton.disabled = true;
            this.recordButton.disabled = false;
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
            const url = this.URL.createObjectURL(blob);
            const au = document.createElement('audio');
            const li = document.createElement('li');
            const link = document.createElement('a');

            //name of .wav file to use during upload and download (without extendion)
            const filename = new Date().toISOString();

            //add controls to the <audio> element
            au.controls = true;
            au.src = url;

            //save to disk link
            link.href = url;
            link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
            link.innerHTML = "Save to disk";

            //add the new audio element to li
            li.appendChild(au);
            
            //add the filename to the li
            li.appendChild(document.createTextNode(filename+".wav "))

            //add the save to disk link to li
            li.appendChild(link);
            
            //upload link
            const upload = document.createElement('a');
            upload.href="#";
            upload.innerHTML = "Upload";
            upload.addEventListener("click", function(event){
                const xhr=new XMLHttpRequest();
                xhr.onload=function(e) {
                    if(this.readyState === 4) {
                        console.log("Server returned: ",e.target.responseText);
                    }
                };
                const fd=new FormData();
                fd.append("audio_data",blob, filename);
                xhr.open("POST","upload.php",true);
                xhr.send(fd);
            })
            li.appendChild(document.createTextNode (" "))//add a space in between
            li.appendChild(upload)//add the upload link to li

            //add the li element to the ol
            recordingsList.appendChild(li);
        }
    },
    mounted(){
        this.recordButton = document.getElementById("recordButton");
        this.stopButton = document.getElementById("stopButton");
        this.pauseButton = document.getElementById("pauseButton");
        this.URL = window.URL || window.webkitURL
        this.AudioContext = window.AudioContext || window.webkitAudioContext
    }
}
</script>
