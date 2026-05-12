import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  images: string[];
  mainImage: string;
  date: string;
}

const postsDirectory = path.join(process.cwd(), 'public/blog-posts');

const POST_METADATA: Record<string, { date: string }> = {
  'valorizacao-2026': { date: '2026-01-30' },
  'campinas-evolucao': { date: '2024-05-06' },
  'poder-marketing-venda': { date: '2023-10-09' },
  'facilidades-campinas-kobrasol': { date: '2023-07-19' },
  'aquecimento-lancamentos': { date: '2023-04-03' },
  'importancia-construcao-civil': { date: '2023-01-25' },
  'beneficios-litoral': { date: '2022-12-21' },
  'vantagens-imobiliaria': { date: '2022-09-14' },
  'revitalizacao-rua-koesa': { date: '2021-11-12' },
  'beira-rio-forquilhas': { date: '2021-10-27' },
  'vantagens-apartamento': { date: '2021-10-21' },
  'descubra-sao-jose': { date: '2021-07-15' },
  'melhores-bairros-sao-jose': { date: '2021-06-10' },
  'historia-sao-jose': { date: '2021-03-19' },
};

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) return [];
  
  const slugs = fs.readdirSync(postsDirectory);
  
  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, slug, 'index.md');
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const titleMatch = fileContents.match(/^# (.*)/m);
    const summaryMatch = fileContents.match(/\*\*Resumo:\*\* (.*)/);
    
    const folderFiles = fs.readdirSync(path.join(postsDirectory, slug));
    const mainImage = folderFiles.find(f => f.match(/\.(jpg|jpeg|png|webp)$/i)) || '';

    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      summary: summaryMatch ? summaryMatch[1] : '',
      content: fileContents,
      mainImage: mainImage ? `/blog-posts/${slug}/${mainImage}` : '',
      images: [] as string[],
      date: POST_METADATA[slug]?.date || '2021-01-01'
    };
  }).filter((post): post is BlogPost => post !== null);

  // Ordenar por data decrescente
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    images,
    date: POST_METADATA[slug]?.date || '2021-01-01'
  };
}
