export const MessageType = {
  text: 0,
  image: 1,
};
// to obj url
// let mimeType = elem.message
//   .split(",")[0]
//   .split(":")[1]
//   .split(";")[0];
// let binaryData = window.atob(elem.message.split(",")[1]);
// const blobFile = new Blob([binaryData], { type: mimeType });
// let obj_url = URL.createObjectURL(blobFile);
// // cleaning on unload
// window.addEventListener("unload", () => {
//   // URL.revokeObjectURL(obj_url);
// });
