import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import {
  getAllStaticFileIds,
  getStaticFileData,
  getPostsDirectory,
} from '../../lib/static-file';

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    content: string;
  };
}) {
  return (
    <Layout heading={postData.title}>
      <p>{postData.content}</p>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllStaticFileIds(getPostsDirectory());
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getStaticFileData(
    params.id as string,
    getPostsDirectory()
  );
  return {
    props: {
      postData,
    },
  };
};
