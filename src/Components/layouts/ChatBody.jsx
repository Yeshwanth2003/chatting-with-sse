import ChatBox from "./ChatBodyComponents/Chatbox";
import Availablebox from "./ChatBodyComponents/Availablebox";
import { useContext, useState, useImperativeHandle, forwardRef } from "react";
import ContextTag from "../ContextTag";
import "./styles/chatbody.css";

const ChatBody = forwardRef((props, ref) => {
  let { userName, setPeerDetails, peerDetails, inbox, userId } =
    useContext(ContextTag);
  let [shallChat, setShallChat] = useState(false);
  let [availableUsers, setAvailableUsers] = useState([]);

  useImperativeHandle(ref, () => ({
    setAvailableUsers,
  }));

  return (
    <>
      <div className="chatbody-wrapper">
        <div id="chatBodyRunner" className="chatbody-runner">
          <ContextTag.Provider
            value={{
              userName,
              shallChat,
              setShallChat,
              availableUsers,
              setPeerDetails,
              peerDetails,
              inbox,
              userId,
            }}
          >
            <Availablebox />
            <ChatBox />
          </ContextTag.Provider>
        </div>
        {userName && (
          <div className="greet-user">
            <p>{`Hi ${userName}`}</p>
          </div>
        )}
      </div>
    </>
  );
});

export default ChatBody;
