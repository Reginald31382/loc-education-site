"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

type Comment = {
  _id: string;
  userName: string;
  userImage: string;
  content: string;
  createdAt: string;
};

type ApprovedCommentsProps = {
  articleSlug: string;
  contentType?: "lesson" | "product";
};

export default function ApprovedComments({
  articleSlug,
  contentType = "lesson",
}: ApprovedCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComments() {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/comments/${articleSlug}?contentType=${contentType}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load comments.");
        }

        setComments(data.comments);
      } catch (error) {
        console.error("LOAD_COMMENTS_ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, [articleSlug, contentType]);

  if (loading) {
    return (
      <section className="mt-12 border-t border-black/10 pt-12">
        <p className="text-sm text-black/45">Loading discussion...</p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sand">
          <MessageCircle size={19} />
        </div>

        <div>
          <span className="section-label">Community</span>

          <h2 className="font-display text-3xl font-bold">
            Community discussion
          </h2>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="mt-7 rounded-3xl border border-black/10 bg-white/60 p-7">
          <p className="text-sm leading-7 text-black/50">
            No approved comments yet. Be the first to share your experience.
          </p>
        </div>
      ) : (
        <div className="mt-7 space-y-5">
          {comments.map((comment) => (
            <article
              key={comment._id}
              className="rounded-3xl border border-black/10 bg-white/60 p-6"
            >
              <div className="flex items-center gap-3">
                {comment.userImage ? (
                  <img
                    src={comment.userImage}
                    alt={comment.userName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-sm font-bold">
                    {comment.userName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-bold">{comment.userName}</h3>

                  <p className="mt-1 text-xs text-black/40">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <p className="mt-5 whitespace-pre-wrap leading-7 text-black/65">
                {comment.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
