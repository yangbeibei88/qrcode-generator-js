const form = document.getElementById("generate-qr-form");
const qrOutput = document.getElementById("qr-output");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = async (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("urlInput").value;
  const size = document.getElementById("size").value;
  const color = document.getElementById("color").value;

  console.log(url, size, color);

  if (url === "") {
    alert("Please enter a URL");
  } else {
    try {
      // after submit, display spinner first then disappear it in 1 sec
      showSpinner();
      await delay(1000);
      hideSpinner();
      await generateQRCode(url, size, color);
      await delay(50);
      const saveUrl = qr.querySelector("img").src;
      createSaveBtn(saveUrl, size, color);
    } catch (error) {
      console.error("Error generator QR code: ", error);
    }
  }
};

const generateQRCode = (url, size, color) => {
  return new Promise((resolve, reject) => {
    try {
      const qrcode = new QRCode(qr, {
        text: url,
        width: size,
        height: size,
        colorDark: color,
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

const createSaveBtn = (saveUrl, size, color) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = "btn btn-success my-5";
  link.href = saveUrl;
  link.download = `qrcode_${size}_${color}`;
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
