// Initialize when the page loads

window.addEventListener("DOMContentLoaded", () => {
    if ("speechSynthesis" in window) {
        // Get the voice-select element
        const voiceSelect = document.getElementById("voice-select");

        // Function to populate the voice options
        function populateVoiceList() {
            const voices = speechSynthesis.getVoices();

            voices.forEach((voice) => {
                const option = document.createElement("option");
                option.textContent = `${voice.name} (${voice.lang})`;
                option.setAttribute("data-lang", voice.lang);
                option.setAttribute("data-name", voice.name);
                voiceSelect.appendChild(option);
            });
        }

        // Call the function to populate the voice options when the voices are available
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }

        document.getElementById("speak").addEventListener("click", () => {
            const textInput = document.getElementById("text-input");
            const volume = +document.getElementById("volume").value         // Samuel
            const rate = +document.getElementById("rate").value             // Samuel
            const pitch = +document.getElementById("pitch").value           // Samuel
            const text = textInput.value.trim();

            if (!text) {
                alert("Please enter some text");
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);

            // Get the selected voice
            const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute(
                "data-name"
            );
            const selectedVoice = speechSynthesis
                .getVoices()
                .find((voice) => voice.name === selectedVoiceName);
            utterance.voice = selectedVoice;
            // Optional: Customize the rate and pitch
            utterance.pitch = pitch; // Set the pitch between 0 (lowest) and 2 (highest)    Change the number 1 to the pitch variable
            utterance.rate = rate; // Set the speech rate (0.1 to 10)                       Change the number 1 to the rate variable

            utterance.pitch = utterance.volume = volume; // Set the speech volume (0 to 1)  Change the number 1 to the volume variable

            // Speak the text
            speechSynthesis.speak(utterance);
        });
        // Show an error message if browser doesn't support the Web Speech API
    } else {
        alert("Your browser does not support the Web Speech API");
    }
});

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();

var language
var volume
var rate
var pitch

document.getElementById("voice-select").addEventListener("click", () => {

    language = document.getElementById('voice-select').value
    language = language.slice(-6)
    language = language.slice(0, 5)

    // if (language != "pt-BR" && language != "en-GB") {
    //     language = "en-US"
    // }

    document.documentElement.setAttribute("lang", language)
    if (language == "pt-BR") {
        document.getElementById("title").innerHTML = "JavaScript<br>Texto para fala"
        document.getElementById("speak").innerHTML = "Texto para fala"
        document.getElementById("listen").innerHTML = "Comando"
        document.getElementById("doc").innerHTML = "Documentação"
        document.getElementById("rate-label").innerHTML = "Vel"
        document.getElementById("pitch-label").innerHTML = "Tom"
        document.getElementById("text-input").placeholder = "Digite o seu texto aqui"
    } else {
        document.getElementById("title").innerHTML = "JavaScript<br>Text-to-Speech"
        document.getElementById("speak").innerHTML = "Text-to-Speech"
        document.getElementById("listen").innerHTML = "Command"
        document.getElementById("doc").innerHTML = "Documentation"
        document.getElementById("rate-label").innerHTML = "Rate"
        document.getElementById("pitch-label").innerHTML = "Pitch"
        document.getElementById("text-input").placeholder = "Type your text here"
    }

    recognition.continuous = false
    recognition.lang = language
    recognition.interimResults = false
    recognition.maxAlternatives = 1
})

document.getElementById("listen").addEventListener("click", () => {
    recognition.start()
})

recognition.onresult = function (event) {
    var command = event.results[0][0].transcript;
    applyCommand(command.toLowerCase())
}

recognition.onspeechend = function () {
    recognition.stop();
}

function applyCommand(command) {
    if (command == "turn the volume up" || command == "turn up the volume" || command == "aumentar volume") {
        volume = +document.getElementById('volume').value
        document.getElementById('volume').value = volume + 0.1
    } else if (command == "turn the volume down" || command == "turn down the volume" || command == "diminuir volume") {
        volume = +document.getElementById('volume').value
        document.getElementById('volume').value = volume - 0.1
    } else if (command == "turn off the volume" || command == "turn the volume off" || command == "desligar volume") {
        document.getElementById('volume').value = 0
    } else if (command == "turn on the volume" || command == "turn the volume on" || command == "ligar volume") {
        document.getElementById('volume').value = 0.5
    } else if (command == "set volume to maximum" || command == "definir volume no maximo") {
        document.getElementById('volume').value = 1
    } else if (command == "turn the rate up" || command == "turn up the rate" || command == "aumentar velocidade") {
        rate = +document.getElementById('rate').value
        document.getElementById('rate').value = rate + 0.1
    } else if (command == "turn the rate down" || command == "turn down the rate" || command == "diminuir velocidade") {
        rate = +document.getElementById('rate').value
        document.getElementById('rate').value = rate - 0.1
    } else if (command == "set minimum rate" || command == "definir velocidade no minimo") {
        document.getElementById('rate').value = 0.1
    } else if (command == "set normal rate" || command == "definir velocidade normal") {
        document.getElementById('rate').value = 0.5
    } else if (command == "set maximum rate" || command == "definir velocidade no maximo") {
        document.getElementById('rate').value = 10
    } else if (command == "turn the pitch up" || command == "turn up the pitch" || command == "aumentar tom") {
        pitch = +document.getElementById('pitch').value
        document.getElementById('pitch').value = pitch + 1
    } else if (command == "turn the pitch down" || command == "turn down the pitch" || command == "diminuir tom") {
        pitch = +document.getElementById('pitch').value
        document.getElementById('pitch').value = pitch - 1
    } else if (command == "turn off the pitch" || command == "turn the pitch off" || command == "desligar tom") {
        document.getElementById('pitch').value = 0
    } else if (command == "turn on the pitch" || command == "turn the pitch on" || command == "ligar tom") {
        document.getElementById('pitch').value = 1
    } else if (command == "set pitch to maximum" || command == "definir tom no máximo") {
        document.getElementById('pitch').value = 2
    }
}