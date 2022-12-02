const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("handling submit");
  let signedUrl = null;
  const accessKey = document.getElementById("access-id");
  const secretAccessKey = document.getElementById("secret-access-id");
  const input = document.getElementById("file-upload-input");

  await fetch("/api/get_signed_url", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      accessKey: accessKey.value,
      secretAccessKey: secretAccessKey.value,
      fileName: input.value,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      signedUrl = json.signedUrl;
    })
    .catch((err) => console.error(err));

  console.log("uploading file");

  const response = await fetch(signedUrl, {
    method: "PUT",
    body: input.files[0],
  });
  console.log(`\nResponse returned by signed URL: ${await response.text()}\n`);
  console.log("done with submission");
};

export default handleSubmit;
