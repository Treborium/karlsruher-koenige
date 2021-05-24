import { promises as fs, readFileSync, readdirSync } from 'fs';
import path from 'path';

export interface Post {
  title: string;
  content: string;
}

export async function getSortedPostsData(): Promise<Post[]> {
  const filenames = await fs.readdir(getPostsDirectory());

  const posts = filenames.map(async (filename) => {
    const filePath = path.join(getPostsDirectory(), filename);
    const fileContents = await fs.readFile(filePath, 'utf8');

    return {
      title: filename,
      content: fileContents,
    };
  });

  return await Promise.all(posts);
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(getPostsDirectory(), id);
  const fileContents = readFileSync(fullPath, 'utf8');

  // Combine the data with the id and contentHtml
  return {
    title: id,
    content: fileContents,
  };
}

export function getAllPostIds() {
  const fileNames = readdirSync(getPostsDirectory());
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName,
      },
    };
  });
}

function getPostsDirectory(): string {
  return path.join(process.cwd(), 'posts');
}
