import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  images: string[];
  mainImage: string;
}

const postsDirectory = path.join(process.cwd(), 'public/blog-posts');

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = fs.readdirSync(postsDirectory);
  
  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, slug, 'index.md');
    
    // Skip if not a directory or index.md doesn't exist
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Basic parsing for our specific format
    const titleMatch = fileContents.match(/^# (.*)/m);
    const summaryMatch = fileContents.match(/\*\*Resumo:\*\* (.*)/);
    
    // Find first image in the folder for the card
    const folderFiles = fs.readdirSync(path.join(postsDirectory, slug));
    const mainImage = folderFiles.find(f => f.match(/\.(jpg|jpeg|png|webp)$/i)) || '';

    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      summary: summaryMatch ? summaryMatch[1] : '',
      content: fileContents,
      mainImage: mainImage ? `/blog-posts/${slug}/${mainImage}` : '',
      images: [] as string[] // Detailed extraction can be done in getPostBySlug
    };
  }).filter((post): post is BlogPost => post !== null);

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, slug, 'index.md');
  
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const titleMatch = fileContents.match(/^# (.*)/m);
  const summaryMatch = fileContents.match(/\*\*Resumo:\*\* (.*)/);
  
  const folderFiles = fs.readdirSync(path.join(postsDirectory, slug));
  const images = folderFiles
    .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
    .map(f => `/blog-posts/${slug}/${f}`);

  return {
    slug,
    title: titleMatch ? titleMatch[1] : slug,
    summary: summaryMatch ? summaryMatch[1] : '',
    content: fileContents,
    mainImage: images[0] || '',
    images
  };
}
