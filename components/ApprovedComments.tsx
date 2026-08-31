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
};

export default function ApprovedComments({
  articleSlug,
}: ApprovedCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComments() {
      try {
        const response = await fetch(
          `/api/comments/${encodeURIComponent(articleSlug)}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load comments.");
        }

        setComments(data.comments);
      } catch (error) {
        console.error("APPROVED_COMMENTS_ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, [articleSlug]);

  if (loading) {
    return (
      <section className="mt-16 border-t border-black/10 pt-12">
        <p className="text-sm text-black/45">Loading discussion...</p>
      </section>
    );
  }

  return (
    <section className="mt-16 border-t border-black/10 pt-12">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand">
          <MessageCircle size={20} />
        </div>

        <div>
          <span className="section-label">Community</span>

          <h2 className="mt-1 font-display text-3xl font-bold tracking-[-0.03em]">
            Reader discussion
          </h2>

          <p className="mt-2 max-w-xl leading-7 text-black/50">
            Thoughts and experiences shared by the LOCED community.
          </p>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-black/10 bg-white/60 p-7">
          <p className="font-semibold">No comments yet.</p>

          <p className="mt-2 text-sm leading-6 text-black/50">
            Be the first to share your experience or perspective.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
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
                    className="h-10 w-10 rounded-full border border-black/10 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-sm font-bold">
                    {comment.userName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold">{comment.userName}</h3>

                  <p className="text-xs text-black/40">
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
