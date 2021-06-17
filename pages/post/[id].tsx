import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import {
  getObject,
  getStaticPathsForPosts,
  initS3Client,
  Message,
} from '../../lib/posts';
import { createHash } from 'crypto';

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
  return {
    paths: await getStaticPathsForPosts(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const key = createHash('md5')
    .update(params.id as string)
    .digest('hex');
  const content = await getObject(initS3Client(), key as string);
  const message: Message = JSON.parse(content);
  return {
    props: {
      postData: { title: message.subject, content: message.text },
    },
  };
};