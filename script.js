function getDownload() {
  const url = document.getElementById("videoURL").value;
  const resultBox = document.getElementById("result");

  if (!url.includes("youtube.com/watch")) {
    resultBox.innerHTML = "<p>Please enter a valid YouTube URL.</p>";
    return;
  }

  const videoId = new URL(url).searchParams.get("v");
  const downloadURL = `https://www.y2mate.com/youtube/${videoId}`;

  resultBox.innerHTML = `
    <p><strong>Download Link:</strong></p>
    <a href="${downloadURL}" target="_blank">${downloadURL}</a>
    <p>Click to open y2mate and select your desired quality.</p>
  `;
}
