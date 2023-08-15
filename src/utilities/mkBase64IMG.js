import { imagePicker } from "./imagePicker";

export async function mkBase64IMG(callback) {
  let file = await imagePicker();
  if (!file) {
    // if user closes the file picker
    callback(file);
    return;
  }
  let fileReader = new FileReader();
  fileReader.onloadend = () => {
    callback(fileReader.result);
  };
  fileReader.readAsDataURL(file);
}
