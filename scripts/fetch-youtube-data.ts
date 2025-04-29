import { google } from 'googleapis';
import { writeFile } from 'fs/promises';
import { join } from 'path';

if (!process.env.CHANNEL_ID) {
  throw new Error('CHANNEL_ID environment variable is not set');
}

interface VideoData {
  id?: string | null;
  title?: string | null;
  description?: string | null;
  publishedAt?: string | null;
  thumbnailUrl?: string | null;
  viewCount?: string | null;
}

async function fetchLatestVideo(): Promise<VideoData> {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  const searchRequest = await youtube.search.list({
    channelId: process.env.CHANNEL_ID,
    part: ["snippet"],
    order: 'date',
    maxResults: 1
  });

  const video = searchRequest.data.items?.[0];
  if (!video || !video.id) {
    throw new Error('No video found');
  }

  const videoDataRequest = await youtube.videos.list({
    part: ['statistics', 'snippet'],
    id: [video.id.videoId as string]
  });

  const videoData = videoDataRequest.data.items?.[0];
  if (!videoData || !videoData.snippet) {
    throw new Error('No video data found');
  }

  return {
    id: video.id.videoId,
    title: videoData.snippet?.title,
    description: videoData.snippet?.description,
    publishedAt: videoData.snippet?.publishedAt,
    thumbnailUrl: videoData.snippet?.thumbnails?.maxres?.url,
    viewCount: videoData.statistics?.viewCount,
  };
}

async function main() {
  try {
    const videoData = await fetchLatestVideo();
    await writeFile(
      join(process.cwd(), 'public/data/latest-video.json'),
      JSON.stringify(videoData, null, 2)
    );
    console.log('Successfully updated video data');
  } catch (error) {
    console.error('Error updating video data:', error);
    process.exit(1);
  }
}

main(); 