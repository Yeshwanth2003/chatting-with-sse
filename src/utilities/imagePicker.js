export async function imagePicker() {
  const pickerOpts = {
    types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };
  try {
    let [filehandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await filehandle.getFile();
    return file;
  } catch {
    return null;
  }
}
