import EventEmitter from "events";

export default class MessageHouse extends EventEmitter {
  #priority;
  constructor(CLIENT_S) {
    super();
    this.CLIENT_S = CLIENT_S;
    this.messageHouse = [];
    this.#priority = 0;
  }
  //   manage arrival and others
  addMessage(messageObj) {
    this.messageHouse.push(
      new MessageFrame(
        messageObj.from,
        messageObj.to,
        messageObj.message,
        messageObj.type,
        messageObj.id,
        this.#priority++
      )
    );
    this.emit("newmessage", messageObj.from, messageObj.to);
  }
  removeMessages(name) {
    this.messageHouse = this.messageHouse.filter(
      (elem) => elem.from !== name && elem.to !== name
    );
    this.emit("hydrateclientmessage");
  }
}

class MessageFrame {
  constructor(from, to, message, type, id, priority) {
    this.from = from;
    this.to = to;
    this.message = message;
    this.type = type;
    this.id = id;
    this.priority = priority;
  }
}
