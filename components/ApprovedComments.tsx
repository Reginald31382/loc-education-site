"use client";

import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";

type Comment = {
  _id: string;
  userName: string;
  userImage: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  adminReply?: string;
  adminReplyAt?: string | null;
};

type ApprovedCommentsProps = {
  articleSlug: string;
  contentType?: "lesson" | "product";
};

export default function ApprovedComments({
  articleSlug,
  contentType = "lesson",
}: ApprovedCommentsProps) {
  const { data: session } = useSession();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [likingId, setLikingId] = useState<string | null>(null);

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

  async function handleLike(comment: Comment) {
    const userId = session?.user?.id;

    if (!userId) {
      return;
    }

    try {
      setLikingId(comment._id);

      const response = await fetch(
        `/api/comments/${articleSlug}/${comment._id}/like`,
        {
          method: comment.liked ? "DELETE" : "POST",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update like.");
      }

      setComments((currentComments) =>
        currentComments.map((currentComment) => {
          if (currentComment._id !== comment._id) {
            return currentComment;
          }

          return {
            ...currentComment,
            likes: data.likes,
            liked: data.liked,
          };
        }),
      );
    } catch (error) {
      console.error("COMMENT_LIKE_ERROR", error);
    } finally {
      setLikingId(null);
    }
  }

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
              {/* READER COMMENT */}
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

              {/* LIKE BUTTON */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => handleLike(comment)}
                  disabled={!session?.user?.id || likingId === comment._id}
                  title={
                    !session?.user?.id
                      ? "Sign in to like comments"
                      : comment.liked
                        ? "Unlike this comment"
                        : "Like this comment"
                  }
                  className={`
                    inline-flex items-center gap-2 rounded-full
                    border px-4 py-2 text-sm font-semibold
                    transition-all
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${
                      comment.liked
                        ? "border-terracotta/20 bg-terracotta/10 text-terracotta"
                        : "border-black/10 bg-white text-black/55 hover:bg-black/5"
                    }
                  `}
                >
                  <Heart
                    size={16}
                    fill={comment.liked ? "currentColor" : "none"}
                  />

                  <span>{comment.liked ? "Liked" : "Like"}</span>

                  <span className="min-w-5 text-center">{comment.likes}</span>
                </button>

                {!session?.user?.id && (
                  <p className="mt-2 text-xs text-black/35">
                    Sign in to like this comment.
                  </p>
                )}
              </div>

              {/* LOCED RESPONSE */}
              {comment.adminReply && (
                <div className="mt-6 rounded-2xl border border-terracotta/15 bg-terracotta/5 p-5">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-terracotta" />

                    <span className="section-label">LOCED response</span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap leading-7 text-black/65">
                    {comment.adminReply}
                  </p>

                  {comment.adminReplyAt && (
                    <p className="mt-3 text-xs text-black/35">
                      Responded{" "}
                      {new Date(comment.adminReplyAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
