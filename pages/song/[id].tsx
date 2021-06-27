import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
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
    <>
      <Head>
        <title>{songData.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout heading={songData.title} currentPage="songs">
        <p>{songData.content}</p>
      </Layout>
    </>
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
