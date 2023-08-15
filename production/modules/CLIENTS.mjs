import EventEmitter from "events";

export class CLIENTS extends EventEmitter {
  constructor() {
    super();
    this.array = [];
  }

  addNewUser(val) {
    this.array.push(val);
    this.emit("changeinclients");
  }
  removeUser(index) {
    this.array.splice(index, 1);
    this.emit("changeinclients");
  }
}

export class CLIENTNAMES {
  constructor() {
    this.names = [];
  }
  addName(name) {
    this.names.push(name);
  }
  removeName(name) {
    let thisNameIndex = this.names.indexOf(name);
    this.names.splice(thisNameIndex, 1);
  }
  checkForName(name) {
    return this.names.includes(name);
  }
}
