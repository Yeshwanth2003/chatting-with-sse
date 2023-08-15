import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ContextTag from "../../ContextTag";
import ProfileIMG from "../../../asserts/profile.png";
import "./styles/chatbox.css";
import { MessageType } from "../../../utilities/utilityFile";
import { PostMessage } from "../../../apiCall/Subscribe";

export default function CB() {
  let { shallChat } = useContext(ContextTag);

  return (
    <>
      <div className="cb-wrapper">{shallChat && <ChatPage />}</div>
    </>
  );
}

function ChatPage() {
  let { setShallChat, peerDetails, userId, userName } = useContext(ContextTag);
  let [showSend, setShowSend] = useState(false);
  let messageInput = useRef();
  let messageBoxRef = useRef();

  //   toogle-button
  function toogleButton(event) {
    if (event.target.value.length > 0) {
      setShowSend(true);
      return;
    }
    setShowSend(false);
  }
  // on send
  function mkMessageFrame(type) {
    setShowSend(false);
    const messageFrame = {};
    messageFrame.id = userId;
    messageFrame.to = peerDetails.name;
    messageFrame.from = userName;
    // if type is text
    if (type === MessageType.text) {
      if (messageInput.current.value.length <= 0) return;
      messageFrame.type = MessageType.text;
      messageFrame.message = messageInput.current.value;
      messageInput.current.value = "";
    }
    // if type is image
    else {
      messageFrame.type = MessageType.image;
      messageFrame.message = "";
    }
    // might need
    // messageBoxRef.current.addImmediately(messageFrame.message);
    PostMessage(messageFrame);
  }

  return (
    <>
      <div className="sc-wrapper">
        <div className="sc-person-desc-div">
          <div className="sc-profile-div">
            <img src={ProfileIMG} alt="" className="sc-profile-img" />
          </div>
          <h2 className="sc-peer-name">{peerDetails?.name}</h2>
          <div className="sc-leave-peer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
              fill="black"
              style={{ rotate: "180deg", cursor: "pointer" }}
              onClick={() => {
                setShallChat(false);
                document
                  .querySelector("#chatBodyRunner")
                  .classList.remove("chatbody-runner-mobile-slide");
              }}
            >
              <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
            </svg>
          </div>
        </div>
        <div className="sc-body-div">
          <div className="sc-message-container">
            <MessagesBox ref={messageBoxRef} />
          </div>
          <div className="sc-typebox-div">
            <div className="sc-typebox-input-div">
              <input
                type="text"
                placeholder="Type a Message"
                className="sc-typebox-input"
                onChange={toogleButton.bind(this)}
                ref={messageInput}
              />
            </div>
            <div className="sc-typebox-button-div">
              {showSend ? (
                <button
                  className="sc-typebox-button"
                  onClick={mkMessageFrame.bind(this, MessageType.text)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    className="sc-dispatcher-button"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" />
                  </svg>
                </button>
              ) : (
                <button className="sc-typebox-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    className="sc-dispatcher-button"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const MessagesBox = forwardRef((props, ref) => {
  const { inbox, peerDetails } = useContext(ContextTag);
  const [thisInbox, setThisInbox] = useState([]);

  function addImmediately(message) {
    document.querySelector(
      "#messageBox"
    ).innerHTML += `<p id="messageBoxTemp" class="sc-message-to">${message}</p>`;
  }

  useImperativeHandle(ref, () => ({
    addImmediately,
  }));

  // dealing with message display
  useEffect(() => {
    let currentInbox = inbox.filter(
      (elem) => elem.from === peerDetails.name || elem.to === peerDetails.name
    );
    setThisInbox(currentInbox);
  }, [inbox, peerDetails]);
  // scroll effect and temp sideeffect
  useEffect(() => {
    document.querySelector("#messageBox").scrollTop =
      document.querySelector("#messageBox").scrollHeight;
  });
  return (
    <>
      <div id="messageBox" className="sc-messagebox-wrapper">
        {thisInbox.map((elem) => {
          console.log(elem);
          if (elem.type === MessageType.text) {
            if (elem.from === peerDetails.name) {
              return (
                <>
                  <From message={elem.message} />
                </>
              );
            } else {
              return (
                <>
                  <To message={elem.message} />
                </>
              );
            }
          } else {
            return <></>;
          }
        })}
      </div>
    </>
  );
});

function From({ message }) {
  return (
    <>
      <p className="sc-message-from">{message}</p>
    </>
  );
}
function To({ message }) {
  return (
    <>
      <p className="sc-message-to">{message}</p>
    </>
  );
}
