import AWS from 'aws-sdk';
import { createHash } from 'crypto';

export async function getStaticPathsForPosts() {
  const files = await getPosts();
  return files.map((post: Post) => ({ params: { id: createKey(post.title) } }));
}

export async function getPosts(): Promise<Post[]> {
  const s3 = initS3Client();
  const filenames = await listBucketContent(s3);
  const rawContents = await getBucketContent(s3, filenames);

  return rawContents
    .map((content) => JSON.parse(content))
    .map((message: Message) => ({
      title: message.subject,
      content: message.text,
    }));
}

function listBucketContent(s3: AWS.S3): Promise<AWS.S3.ListObjectsV2Output> {
  return s3
    .listObjectsV2({ Bucket: process.env.X_BUCKET_NAME! })
    .promise()
    .catch((error) => {
      console.error('Could not fetch data from S3:', error);
      throw new Error('Could not load posts');
    });
}

function getBucketContent(
  s3: AWS.S3,
  filenames: AWS.S3.ListObjectsV2Output
): Promise<string[]> {
  return Promise.all(
    filenames.Contents.map((entry) => getObject(s3, entry.Key))
  );
}

export function initS3Client(): AWS.S3 {
  const credentials = new AWS.Credentials({
    accessKeyId: process.env.X_ACCESS_KEY_ID!,
    secretAccessKey: process.env.X_SECRET_ACCESS_KEY!,
  });
  AWS.config.credentials = credentials;

  return new AWS.S3({ apiVersion: '2006-03-01', credentials: credentials });
}

export async function getObject(s3: AWS.S3, key: string): Promise<string> {
  const object = await s3
    .getObject({ Bucket: process.env.X_BUCKET_NAME!, Key: key })
    .promise()
    .catch((error) => {
      console.error('Could not get object from S3:', error);
      throw new Error(`could not load post with key=${key}`);
    });

  return object.Body.toString();
}

export function createKey(str: string): string {
  return createHash('md5').update(str).digest('hex');
}

export interface Message {
  from: string;
  subject: string;
  receivedOn: string;
  text: string;
  html: string;
}

export interface Post {
  title: string;
  content: string;
}
