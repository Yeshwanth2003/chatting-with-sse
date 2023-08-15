import Header from "./layouts/Header";
import NamePopup from "./layouts/NamePopup";
import { useEffect, useRef, useState } from "react";
import ContextTag from "./ContextTag";
import ChatBody from "./layouts/ChatBody";
import "./app.css";
import { LISTEN_SSE, SSE_Subscribe } from "../apiCall/Subscribe";

export default function App() {
  let [userId, setUserId] = useState(null);
  let [userName, setUserName] = useState("");
  let [peerDetails, setPeerDetails] = useState({});
  let [inbox, setInbox] = useState([]);
  let chatBodyRef = useRef();

  useEffect(() => {
    if (userName.length === 0 && userName === "") {
      return;
    }
    // subscribe to events
    const ES = SSE_Subscribe(userName);
    // sse events listener
    LISTEN_SSE(
      ES,
      chatBodyRef.current.setAvailableUsers,
      setInbox,
      setUserId
    );

    // unsubscribe
    window.addEventListener("beforeunload", () => {
      ES.close();
    });
    return () => {
      ES.close();
    };
  }, [userName]);

  return (
    <>
      <div className="chat-wrapper">
        <div className="chat-header-continer">
          <Header />
        </div>
        <div className="chat-body-wrapper">
          <ContextTag.Provider
            value={{ userName, peerDetails, setPeerDetails, inbox, userId }}
          >
            <ChatBody ref={chatBodyRef} />
          </ContextTag.Provider>
        </div>
      </div>
      <ContextTag.Provider value={{ setUserName }}>
        <NamePopup />
      </ContextTag.Provider>
    </>
  );
}
