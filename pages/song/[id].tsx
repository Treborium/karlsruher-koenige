import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import {
  getAllStaticFileIds,
  getStaticFileData,
  getSongsDirectory,
} from '../../lib/static-file';

export default function Song({
  songData,
}: {
  songData: {
    title: string;
    content: string;
  };
}) {
  return (
    <Layout heading={songData.title}>
      <p>{songData.content}</p>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllStaticFileIds(getSongsDirectory());
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const songData = await getStaticFileData(
    params.id as string,
    getSongsDirectory()
  );
  return {
    props: {
      songData,
    },
  };
};
