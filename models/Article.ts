import mongoose, { Schema, type Model } from "mongoose";

export type ArticleDocument = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  body: string[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ArticleSchema = new Schema<ArticleDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    readTime: {
      type: String,
      required: true,
      trim: true,
    },

    body: {
      type: [String],
      required: true,
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Article =
  (mongoose.models.Article as Model<ArticleDocument>) ||
  mongoose.model<ArticleDocument>("Article", ArticleSchema);

export default Article;
