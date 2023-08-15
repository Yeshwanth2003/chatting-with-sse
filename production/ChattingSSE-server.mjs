import http from "http";
import RequestListener from "./modules/RequestListener.mjs";
import { CLIENTS, CLIENTNAMES } from "./modules/CLIENTS.mjs";
import {
  BroadcastAvailable,
  sendMessage,
  hydrateUsers,
} from "./modules/BroadCast.mjs";
import MessageHouse from "./modules/MessageHouse.mjs";

const CLIENT_S = new CLIENTS();
const Message_House = new MessageHouse(CLIENT_S);
const CLIENT_NAMES = new CLIENTNAMES();
const Server = http.createServer();
Server.listen(80);
RequestListener(Server, CLIENT_S, CLIENT_NAMES, Message_House);

// on new client or on removal of client
CLIENT_S.on("changeinclients", () => {
  // broadcast available
  BroadcastAvailable(CLIENT_S);
});

// on new message
Message_House.on("newmessage", (from, to) => {
  sendMessage(CLIENT_S, Message_House, from, to);
});
// hydrateclient
Message_House.on("hydrateclientmessage", (from, to) => {
  hydrateUsers(Message_House, CLIENT_S);
});
