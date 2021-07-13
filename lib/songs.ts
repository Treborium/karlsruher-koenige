import { promises as fs } from 'fs';
import path from 'path';

export interface SongMetaData {
  title: string;
  lyricsFile: string;
  priority?: number;
  spotifyLink?: string;
}

export interface Song extends SongMetaData {
  content: string;
}

const songs: SongMetaData[] = [
  {
    title: 'Königslied',
    lyricsFile: 'Königslied',
    priority: 1,
  },
  {
    title: 'Das Schweinelied',
    lyricsFile: 'Das Schweinelied',
    spotifyLink:
      'https://open.spotify.com/track/64ZNECIznkotmB93mCx6BZ?si=3a50c5a272684861',
  },
  {
    title: 'Es gibt kein Bier auf Hawaii',
    lyricsFile: 'Es gibt kein Bier auf Hawaii',
    spotifyLink:
      'https://open.spotify.com/track/4Gs4xdlHoOTNszWdJsIU0Z?si=fdb336354cb446b4',
  },
];

export function getSongsPaths() {
  return songs.map((song) => {
    return {
      params: {
        id: song.title,
      },
    };
  });
}

export function getSongs(): SongMetaData[] {
  return songs;
}

export async function getSongData(id: string): Promise<Song> {
  const directoryPath = path.join(process.cwd(), 'songs');
  const filePath = path.join(directoryPath, id);
  const fileContent = await fs.readFile(filePath, 'utf8');

  const song = songs.find((s) => s.title === id);

  return { ...song, ...{ content: fileContent } };
}
