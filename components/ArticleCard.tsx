import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

import type { Article } from "@/lib/articles";
type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/learn/${article.slug}`}
      className="
        group
        block
        h-full
        rounded-[2rem]
        border
        border-black/10
        bg-white/65
        p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:bg-white
        hover:shadow-elevated
      "
    >
      <div className="flex items-start justify-between gap-4">
        <span className="pill">{article.category}</span>

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-black/10
            transition-all
            duration-300
            group-hover:border-terracotta
            group-hover:bg-terracotta
            group-hover:text-white
          "
        >
          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>
      </div>

      <h3
        className="
          mt-7
          font-display
          text-2xl
          font-bold
          leading-tight
          tracking-tight
        "
      >
        {article.title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-black/55">{article.excerpt}</p>

      <div
        className="
          mt-7
          flex
          items-center
          gap-2
          border-t
          border-black/10
          pt-5
          text-[11px]
          font-bold
          uppercase
          tracking-[0.14em]
          text-black/35
        "
      >
        <Clock3 size={14} />

        {article.readTime}
      </div>

      <div
        className="
          mt-5
          text-sm
          font-bold
          text-terracotta
          transition-all
          duration-300
          group-hover:translate-x-1
        "
      >
        Read lesson →
      </div>
    </Link>
  );
}
