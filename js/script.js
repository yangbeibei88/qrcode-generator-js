const form = document.getElementById("generate-qr-form");
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

const clearUI = () => {
  qr.innerHTML = "";
};

form.addEventListener("submit", onGenerateSubmit);
