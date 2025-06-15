
let api = null;
let domain = "meet.jit.si";

function randomRoom() {
  return "OmegirlX_" + Math.random().toString(36).substring(2, 10);
}

function startCall() {
  if (api) {
    api.dispose();
  }
  const room = randomRoom();
  const options = {
    roomName: room,
    parentNode: document.querySelector("#jitsi-container"),
    configOverwrite: {
      disableDeepLinking: true,
    },
    interfaceConfigOverwrite: {
      SHOW_JITSI_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
      SHOW_BRAND_WATERMARK: false,
      DISPLAY_WELCOME_PAGE_CONTENT: false
    }
  };
  api = new JitsiMeetExternalAPI(domain, options);
}

function stopCall() {
  if (api) {
    api.dispose();
    api = null;
  }
}

function nextCall() {
  stopCall();
  setTimeout(startCall, 500);
}
