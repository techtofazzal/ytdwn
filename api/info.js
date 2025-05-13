import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const url = req.query.url;

  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

    const mp4s = formats
      .filter(f => f.container === 'mp4')
      .map(f => ({
        quality: f.qualityLabel,
        url: f.url
      }));

    res.status(200).json({
      title: info.videoDetails.title,
      formats: mp4s
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch video info' });
  }
}
