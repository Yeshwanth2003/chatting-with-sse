import "./styles/header.css";

export default function Header() {
  return (
    <>
      <div className="char-header-wraper chat-mobile-header">
        <div className="chat-logo-div">
          <h1 className="chat-logo">C</h1>
        </div>
        <div className="chat-header-optns-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 -960 960 960"
            width="30"
            fill="white"
          >
            <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 -960 960 960"
            width="30"
            fill="white"
            onClick={() => {
              window.location.reload();
            }}
          >
            <path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-129h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q83 0 152-47.5T728-393h62q-29 105-115 169t-195 64Z" />
          </svg>
        </div>
      </div>
    </>
  );
}
