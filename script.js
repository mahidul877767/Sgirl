
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const stopBtn = document.getElementById("stopBtn");

let localStream;

async function startCamera() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    // Demo: Fake remote stream (mirror local)
    remoteVideo.srcObject = localStream;
  } catch (err) {
    alert("Error accessing camera: " + err.message);
  }
}

function stopCamera() {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
  }
}

startBtn.addEventListener("click", () => {
  startCamera();
});

stopBtn.addEventListener("click", () => {
  stopCamera();
});

nextBtn.addEventListener("click", () => {
  stopCamera();
  setTimeout(() => startCamera(), 500);
});
