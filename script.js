function getDownload() {
  const url = document.getElementById("videoURL").value.trim();
  const resultBox = document.getElementById("result");

  try {
    const videoURL = new URL(url);
    let videoId = "";

    if (videoURL.hostname.includes("youtube.com")) {
      videoId = videoURL.searchParams.get("v");
    } else if (videoURL.hostname === "youtu.be") {
      videoId = videoURL.pathname.substring(1);
    }

    if (!videoId) {
      resultBox.innerHTML = "<p>Please enter a valid YouTube video URL.</p>";
      return;
    }

    const downloadURL = `https://www.y2mate.com/youtube/${videoId}`;

    resultBox.innerHTML = `
      <p><strong>Download Link:</strong></p>
      <a href="${downloadURL}" target="_blank">${downloadURL}</a>
      <p>Click to open Y2Mate and choose your desired quality.</p>
    `;
  } catch (e) {
    resultBox.innerHTML = "<p>Please enter a valid YouTube video URL.</p>";
  }
}
