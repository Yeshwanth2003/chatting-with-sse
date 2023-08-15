import { useContext, useEffect, useState } from "react";
import ContextTag from "../../ContextTag";
import Profile from "../../../asserts/profile.png";
import "./styles/availablebox.css";

export default function AB() {
  let { availableUsers } = useContext(ContextTag);
  let [thisAvailUsers, setThisAvailUsers] = useState([]);

  useEffect(() => {
    if (!availableUsers) return;
    setThisAvailUsers(() => [...availableUsers]);
  }, [availableUsers]);

  function onSearch(event) {
    if (event.target.value.trim().length === 0) {
      setThisAvailUsers(() => [...availableUsers]);
      return;
    }
    setThisAvailUsers(() => {
      let filteredAvail = availableUsers.filter((elem) =>
        elem.name.includes(event.target.value.trim())
      );
      return filteredAvail;
    });
  }

  return (
    <>
      <div className="AB-wrapper">
        <div className="ab-search-box">
          <div className="ab-search-div">
            <input
              type="text"
              placeholder="Search"
              className="ab-search"
              onChange={onSearch.bind(this)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 -960 960 960"
              width="30"
              fill="gray"
              style={{ cursor: "pointer" }}
            >
              <path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z" />
            </svg>
          </div>
        </div>
        <div className="ab-header">
          <h2 className="ab-heading">Available</h2>
        </div>
        <div className="ab-available-box">
          {thisAvailUsers?.map((elem, index) => {
            return (
              <>
                <AvailableCard
                  key={index}
                  name={elem.name}
                  wholeObj={elem}
                  newmessage={elem.newmessage}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

function AvailableCard({ name, newmessage, wholeObj }) {
  let { setPeerDetails, setShallChat } = useContext(ContextTag);

  return (
    <>
      <div
        className="avail-card-wrapper"
        onClick={() => {
          setPeerDetails(wholeObj);
          setShallChat(true);
          document
            .querySelector("#chatBodyRunner")
            .classList.add("chatbody-runner-mobile-slide");
        }}
      >
        <div className="avail-card-img-div">
          <img src={Profile} alt="" className="avail-card-img" />
        </div>
        <section>
          <h3 className="avail-card-peername">{name}</h3>
          {newmessage && (
            <>
              <h4 className="avail-card-newmessage">.new message</h4>
            </>
          )}
        </section>
      </div>
    </>
  );
}
