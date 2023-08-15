let userId;
let url = "http://192.168.244.168";

export function SSE_Subscribe(username) {
  const ES = new EventSource(`/newEventConnection?name=${username}`);
  return ES;
}
export function LISTEN_SSE(ES, setAvailableUsers, setInbox, setUserId) {
  // initial connection event

  ES.addEventListener("connected", (event) => {
    userId = JSON.parse(event.data).your_id;
    setUserId(userId);
  });
  // on change in users

  ES.addEventListener("changeinavailable", (event) => {
    // setting all available user

    let allAvailableUsers = JSON.parse(event.data).filter(
      (elem) => elem.userID !== userId
    );
    setAvailableUsers(
      allAvailableUsers.map((elem) => {
        elem.newmessage = false;
        return elem;
      })
    );
  });
  //  on nameclash

  ES.addEventListener("nameclash", () => {
    alert("Try using unique names");
    window.location.reload();
  });
  // onmessage

  ES.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    setInbox(data.sort((a, b) => a.priority - b.priority));
  });
  // onhydrate

  ES.addEventListener("hydrate", (event) => {
    const data = JSON.parse(event.data);
    setInbox(data.sort((a, b) => a.priority - b.priority));
  });
  // on error

  ES.addEventListener("error", () => {
    alert("Something Went wrong");
    window.location.reload();
  });
}

export function PostMessage(messageFrame) {
  fetch(`/message`, {
    method: "POST",
    body: JSON.stringify(messageFrame),
  }).then(
    () => {
      // on success
    },
    () => {
      // on error
    }
  );
}
