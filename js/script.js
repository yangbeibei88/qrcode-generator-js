const form = document.getElementById("generate-qr-form");
const qrOutput = document.getElementById("qr-output");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = async (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("urlInput").value;
  const size = document.getElementById("size").value;

  console.log(url, size);

  if (url === "") {
    alert("Please enter a URL");
  } else {
    try {
      // after submit, display spinner first then disappear it in 1 sec
      showSpinner();
      await delay(1000);
      hideSpinner();
      await generateQRCode(url, size);
      await delay(50);
      const saveUrl = qr.querySelector("img").src;
      createSaveBtn(saveUrl, size);
    } catch (error) {
      console.error("Error generator QR code: ", error);
    }
  }
};

const generateQRCode = (url, size) => {
  return new Promise((resolve, reject) => {
    try {
      const qrcode = new QRCode(qr, {
        text: url,
        width: size,
        height: size,
        correctLevel: QRCode.CorrectLevel.H,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const createSaveBtn = (saveUrl, size) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = "btn btn-success my-5";
  link.href = saveUrl;
  link.download = `qrcode_${size}`;
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
