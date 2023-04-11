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

        document.getElementById("speak-btn").addEventListener("click", () => {
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
