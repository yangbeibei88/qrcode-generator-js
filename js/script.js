const form = document.getElementById("generate-qr-form");
const qrOutput = document.getElementById("qr-output");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("urlInput").value;
  const size = document.getElementById("size").value;

  console.log(url, size);

  if (url === "") {
    alert("Please enter a URL");
  } else {
    // after submit, display spinner first then disappear it in 1 sec
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      });
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode(qr, {
    text: url,
    width: size,
    height: size,
    correctLevel: QRCode.CorrectLevel.H,
  });
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = "btn btn-success my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save QR Code";
  qrOutput.appendChild(link);
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();
};

hideSpinner();
form.addEventListener("submit", onGenerateSubmit);
