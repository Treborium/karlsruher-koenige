export interface Song {
  id: string;
  title: string;
}

export function getSongs(): Song[] {
  return [
    { id: 'koenigslied', title: 'Königslied' },
    { id: 'schlachtruf', title: 'Schlachtruf' },
    { id: 'kein-bier', title: 'Kein Bier auf Hawaii' },
    { id: 'song-3', title: 'Song 3' },
    { id: 'sonst-noch-was', title: 'Sonst noch was' },
    { id: 'etc', title: 'etc.' },
  ];
}
