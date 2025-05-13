async function getLinks() {
  const url = document.getElementById("ytUrl").value;
  const linksDiv = document.getElementById("links");
  linksDiv.innerHTML = "Loading...";

  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    linksDiv.innerHTML = "Please enter a valid YouTube URL.";
    return;
  }

  try {
    const api = `https://ytdl-api.fly.dev/info?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    const data = await res.json();

    const formats = data.formats.filter(f => f.hasVideo && f.hasAudio && f.mimeType.includes("mp4"));

    linksDiv.innerHTML = `<h3>${data.title}</h3>`;
    formats.forEach(format => {
      const a = document.createElement("a");
      a.href = format.url;
      a.innerText = `Download ${format.qualityLabel}`;
      a.target = "_blank";
      a.download = "";
      linksDiv.appendChild(a);
    });
  } catch (e) {
    linksDiv.innerHTML = "Error fetching video data.";
    console.error(e);
  }
}
