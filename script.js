async function getLinks() {
  const url = document.getElementById("ytUrl").value;
  const linksDiv = document.getElementById("links");
  linksDiv.innerHTML = "Loading...";

  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    linksDiv.innerHTML = "Please enter a valid YouTube URL.";
    return;
  }

  try {
    const api = `/api/info?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    const data = await res.json();

    if (data.error) {
      linksDiv.innerHTML = data.error;
      return;
    }

    linksDiv.innerHTML = `<h3>${data.title}</h3>`;
    data.formats.forEach(format => {
      const a = document.createElement("a");
      a.href = format.url;
      a.innerText = `Download ${format.quality}`;
      a.target = "_blank";
      a.download = "";
      linksDiv.appendChild(a);
    });
  } catch (e) {
    linksDiv.innerHTML = "Error fetching video data.";
    console.error(e);
  }
}
