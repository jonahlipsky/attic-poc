const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("handling submit");
  let signedUrl = null;
  await fetch("/api/get_signed_url", { method: "GET" })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      signedUrl = json.signedUrl;
    })
    .catch((err) => console.error(err));

  const input = document.getElementById("file-upload-input");
  console.log("uploading file");

  const response = await fetch(signedUrl, {
    method: "PUT",
    body: input.files[0],
  });
  console.log(`\nResponse returned by signed URL: ${await response.text()}\n`);
  console.log("done with submission");
};

export default handleSubmit;
