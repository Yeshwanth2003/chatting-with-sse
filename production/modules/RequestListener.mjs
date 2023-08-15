import { randomUUID } from "crypto";
import { parse as url_parse } from "url";
import { readFile } from "fs";

export default function RequestListener(
  Server,
  CLIENT_S,
  CLIENT_NAMES,
  Message_House
) {
  Server.addListener("request", (req, res) => {
    const URL_PARSED = url_parse(req.url);
    // handle new connection of sse
    if (URL_PARSED.pathname === "/") {
      readFile(
        "C:\\Users\\Yeshwanth\\.vscode\\chatting-with-sse\\build\\index.html",
        (err, dats) => {
          res.end(dats);
        }
      );
    } else if (URL_PARSED.pathname === "/newEventConnection") {
      const URL_QUERY = URL_PARSED.query?.split("=")[1];
      const userID = randomUUID();
      const new_client = {
        userID,
        name: URL_QUERY,
        res,
      };
      res.setHeader("access-control-allow-origin", "*");
      res.setHeader("cache-control", "no-cache");
      res.setHeader("content-type", "text/event-stream");
      //  check if unique name
      if (
        CLIENT_NAMES.checkForName(new_client.name) ||
        new_client.name?.length === 0
      ) {
        res.writeHead(200);
        res.end("event:nameclash\ndata:null\n\n");
        return;
      }
      // acknowledge connection
      res.writeHead(200);
      res.write(
        `event:connected\ndata:${JSON.stringify({ your_id: userID })}\n\n`
      );
      CLIENT_NAMES.addName(new_client.name);
      CLIENT_S.addNewUser(new_client);
      // on clients add
      // on close

      res.on("close", () => {
        let index_of_this_res = CLIENT_S.array.indexOf(new_client);
        CLIENT_S.removeUser(index_of_this_res);
        CLIENT_NAMES.removeName(new_client.name);
        Message_House.removeMessages(new_client.name);
      });
    } else if (URL_PARSED.pathname === "/message") {
      // to be removed
      res.setHeader("access-control-allow-origin", "*");
      // on every message post
      let messageBody = "";
      req.on("data", (data) => {
        messageBody += data.toString();
      });
      req.on("end", () => {
        try {
          messageBody = JSON.parse(messageBody);
        } catch {
          console.log("Something went wrong in /message");
        }
        Message_House.addMessage(messageBody);
        res.end();
      });
    } else {
      try {
        readFile(
          `C:\\Users\\Yeshwanth\\.vscode\\chatting-with-sse\\build${URL_PARSED.pathname}`,
          (err, dats) => {
            res.end(dats);
          }
        );
      } catch {}
    }
  });
}
