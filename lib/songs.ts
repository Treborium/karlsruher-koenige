export interface Song {
  id: number;
  title: string;
}

export function getSongs(): Song[] {
  return [
    { id: 1, title: 'Königslied' },
    { id: 2, title: 'Schlachtruf' },
    { id: 3, title: 'Kein Bier auf Hawaii' },
    { id: 4, title: 'Song 3' },
    { id: 5, title: 'Sonst noch was' },
    { id: 6, title: 'etc.' },
  ];
}
