export interface Songs {
  title: string;
  lyricsFile: string;
  priority?: number;
  spotifyLink?: string;
}

const songs: Songs[] = [
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
