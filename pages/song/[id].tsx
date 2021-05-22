import { useRouter } from 'next/router';

const Song = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(router.query);

  return <h1>Site "{id}" under construction. Please come back later!</h1>;
};

export default Song;
