import { connectDB } from "@/lib/mongodb";
import ArticleModel from "@/models/Article";

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  body: string[];
  featured: boolean;
};

export async function getArticles(): Promise<Article[]> {
  await connectDB();

  const articles = await ArticleModel.find({
    published: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  return articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    readTime: article.readTime,
    body: article.body,
    featured: article.featured,
  }));
}

export async function getFeaturedArticles(): Promise<Article[]> {
  await connectDB();

  const articles = await ArticleModel.find({
    published: true,
    featured: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  return articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    readTime: article.readTime,
    body: article.body,
    featured: article.featured,
  }));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await connectDB();

  const article = await ArticleModel.findOne({
    slug,
    published: true,
  }).lean();

  if (!article) {
    return null;
  }

  return {
    slug: article.slug,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    readTime: article.readTime,
    body: article.body,
    featured: article.featured,
  };
}
