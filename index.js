import speech from "@google-cloud/speech";
import fs from "fs";

// Creates a client

const client = new speech.SpeechClient();

// Reads a local audio file and converts it to base64
const file = fs.readFileSync("sample-2.mp3");
const audioBytes = file.toString("base64");

// The audio file's encoding and sample rate
const audio = {
  content: audioBytes,
};
const config = {
  encoding: "LINEAR16",
  sampleRateHertz: 16000,
  languageCode: "en-US",
};
const request = {
  audio: audio,
  config: config,
};

// Detects speech in the audio file
client
  .recognize(request)
  .then((data) => {
    const transcription = data[0].results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    console.log(`Transcription: ${transcription}`);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
