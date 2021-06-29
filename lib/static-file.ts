import { promises as fs, readdirSync } from 'fs';
import path from 'path';

export interface StaticFile {
  title: string;
  content: string;
}

export async function getSortedData(directory: string): Promise<StaticFile[]> {
  const filenames = await fs.readdir(directory);

  const posts = filenames.map(async (filename) => {
    const filePath = path.join(directory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');

    return {
      title: filename,
      content: fileContents,
    };
  });

  return Promise.all(posts);
}

export async function getStaticFileData(
  id: string,
  directory: string
): Promise<StaticFile> {
  const filePath = path.join(directory, id);
  const fileContents = await fs.readFile(filePath, 'utf8');

  // Combine the data with the id and contentHtml
  return {
    title: id,
    content: fileContents,
  };
}

export function getAllStaticFileIds(directory: string) {
  const fileNames = readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName,
      },
    };
  });
}

export function getPostsDirectory(): string {
  return path.join(process.cwd(), 'posts');
}

export function getSongsDirectory(): string {
  return path.join(process.cwd(), 'songs');
}
