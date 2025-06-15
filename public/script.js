
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const startChatBtn = document.getElementById("startChat");
const nextChatBtn = document.getElementById("nextChat");

let localStream;
let peer;
let currentCall;

navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
  localStream = stream;
  localVideo.srcObject = stream;
});

startChatBtn.onclick = () => {
  peer = new Peer();
  peer.on("open", id => {
    fetch('https://0peer.glitch.me/connect?id=' + id) // uses public signaling server
      .then(res => res.json())
      .then(data => {
        if (data.remoteId) {
          const call = peer.call(data.remoteId, localStream);
          setupCall(call);
        } else {
          peer.on("call", call => {
            call.answer(localStream);
            setupCall(call);
          });
        }
      });
  });
};

nextChatBtn.onclick = () => {
  if (currentCall) {
    currentCall.close();
  }
  startChatBtn.click();
};

function setupCall(call) {
  currentCall = call;
  call.on("stream", remoteStream => {
    remoteVideo.srcObject = remoteStream;
  });
  call.on("close", () => {
    remoteVideo.srcObject = null;
  });
}
