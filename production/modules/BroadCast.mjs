export function BroadcastAvailable(CLIENT_S) {
  const Availables_LIST = CLIENT_S.array.map((elem) => {
    return { name: elem?.name, userID: elem?.userID };
  });

  CLIENT_S.array.forEach((element) => {
    element?.res?.write(
      `event:changeinavailable\ndata:${JSON.stringify(Availables_LIST)}\n\n`
    );
  });
}

export function sendMessage(CLIENT_S, Message_House, from, to) {
  // getting messages
  let fromMessages = Message_House.messageHouse.filter(
    (elem) => elem?.from === from || elem?.to === from
  );
  let toMessages = Message_House.messageHouse.filter(
    (elem) => elem?.to === to || elem?.from === to
  );

  //   finding clients
  let fromClient = CLIENT_S.array.find((elem) => elem?.name === from);
  let toClient = CLIENT_S.array.find((elem) => elem?.name === to);

  fromClient.res.write(`data:${JSON.stringify(fromMessages)}\n\n`);
  toClient.res.write(`data:${JSON.stringify(toMessages)}\n\n`);
}

export function hydrateUsers(Message_House, CLIENT_S) {
  CLIENT_S.array.forEach((elem) => {
    let hydrateObj = Message_House.messageHouse.filter(
      (elemt) => elemt?.from === elem?.name || elemt?.to === elem?.name
    );
    elem.res.write(`event:hydrate\ndata:${JSON.stringify(hydrateObj)}\n\n`);
  });
}
