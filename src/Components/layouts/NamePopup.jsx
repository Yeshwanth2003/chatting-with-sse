import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ContextTag from "../ContextTag";
import "./styles/namepopup.css";

export default function NamePopup() {
  return createPortal(<PopUpBody />, document.querySelector("body"));
}

function PopUpBody() {
  let { setUserName } = useContext(ContextTag);
  let nameInputRef = useRef();
  let popupRef = useRef();

  function onSubmit() {
    let name = nameInputRef.current.value;
    if (name.length === 0 || name === "") {
      popupRef.current.classList.add("chat-namepopup-bounce")
      setTimeout(()=>{
        popupRef.current.classList.remove("chat-namepopup-bounce")
      },100)
      return;
    }
    setUserName(name);
    popupRef.current.classList.add("chat-namepopup-close");
  }

  // Listen to Enter event
  useEffect(()=>{

  },[])

  return (
    <>
      <div className="chat-namepopup" ref={popupRef}>
        <div className="chat-namepopup-container">
          <div className="namepopup-logo-div">
            <h1 className="namepopup-logo">
              C<span>hat</span>
            </h1>
          </div>
          <div className="name-popup-body">
            <div className="namepopup-input-holder">
              <input
                ref={nameInputRef}
                type="text"
                className="namepopup-input"
                placeholder="Enter Your Name"
              />
            </div>
            <button onClick={onSubmit.bind(this)} className="name-popup-button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
