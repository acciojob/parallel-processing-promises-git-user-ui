//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(`Failed to download image from ${url}`);

    img.src = url;
  });
}
function downloadImages() {
  // Reset UI
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  const promises = images.map((img) => downloadImage(img.url));

  Promise.all(promises)
    .then((downloadedImages) => {
      loading.style.display = "none";

      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      loading.style.display = "none";
      errorDiv.textContent = err;
    });
}
btn.addEventListener("click", downloadImages);
