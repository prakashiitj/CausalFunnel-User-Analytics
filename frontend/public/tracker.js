(function () {
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId =
      "session_" + Math.random().toString(36).substring(2, 10);

    localStorage.setItem("session_id", sessionId);
  }

  function sendEvent(eventData) {
    fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).catch((err) => console.log(err));
  }

  sendEvent({
    session_id: sessionId,
    event_type: "page_view",
    page_url: window.location.href,
    timestamp: new Date(),
  });

  document.addEventListener("click", (e) => {
    sendEvent({
      session_id: sessionId,
      event_type: "click",
      page_url: window.location.href,
      timestamp: new Date(),
      x: e.clientX,
      y: e.clientY,
    });
  });
})();