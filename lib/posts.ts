export interface Post {
  id: number;
  title: string;
  content: string;
}

export function getSortedPostsData(): Post[] {
  return [
    {
      id: 1,
      title: 'This is a very long title that should get cut off at some point and I hope that point is now :)',
      content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
    },
    {
      id: 2,
      title: 'some title',
      content: 'some content',
    },
    {
      id: 3,
      title: 'some title',
      content: 'some content',
    },
    {
      id: 4,
      title: 'some title',
      content: 'some content',
    },
    {
      id: 5,
      title: 'some title',
      content: 'some content',
    },
    {
      id: 6,
      title: 'some title',
      content: 'some content',
    },
    {
      id: 7,
      title: 'some title',
      content: 'some content',
    },
    {
      id: 8,
      title: 'some title',
      content: 'some content',
    },
    {
      id: 9,
      title: 'some title',
      content: 'some content',
    },
  ]
}
