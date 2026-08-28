import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";

export async function getArticles() {
  await connectDB();

  const articles = await Article.find({
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

export async function getFeaturedArticles() {
  await connectDB();

  const articles = await Article.find({
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

export async function getArticleBySlug(slug: string) {
  await connectDB();

  const article = await Article.findOne({
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
