"use client";

import { useEffect, useState } from "react";
import { Check, X, Clock, MessageCircle, Trash2 } from "lucide-react";

type Comment = {
  _id: string;
  articleSlug: string;
  contentType: "lesson" | "product";
  userName: string;
  userImage: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export default function AdminCommentsClient() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadComments() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/comments");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load comments.");
      }

      setComments(data.comments);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while loading comments.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateCommentStatus(
    id: string,
    status: "approved" | "rejected",
  ) {
    try {
      setUpdatingId(id);
      setError("");

      const response = await fetch(`/api/admin/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update comment.");
      }

      setComments((currentComments) =>
        currentComments.map((comment) =>
          comment._id === id
            ? {
                ...comment,
                status,
              }
            : comment,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the comment.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteComment(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this comment? This cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`/api/admin/comments/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete comment.");
      }

      setComments((currentComments) =>
        currentComments.filter((comment) => comment._id !== id),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the comment.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    loadComments();
  }, []);

  const pendingComments = comments.filter(
    (comment) => comment.status === "pending",
  );

  const approvedComments = comments.filter(
    (comment) => comment.status === "approved",
  );

  const rejectedComments = comments.filter(
    (comment) => comment.status === "rejected",
  );

  if (loading) {
    return (
      <main className="container-site py-20">
        <p className="text-black/50">Loading comments...</p>
      </main>
    );
  }

  return (
    <main className="container-site py-14 sm:py-20">
      <div className="max-w-5xl">
        <span className="section-label">Administration</span>

        <h1 className="mt-3 font-display text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
          Comment moderation
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/55">
          Review community comments before they become publicly visible on
          LOCED.
        </p>

        {/* COMMENT COUNTS */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-black/10 bg-white/60 p-5">
            <span className="text-sm text-black/45">Pending</span>

            <p className="mt-2 font-display text-4xl font-bold">
              {pendingComments.length}
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/60 p-5">
            <span className="text-sm text-black/45">Approved</span>

            <p className="mt-2 font-display text-4xl font-bold">
              {approvedComments.length}
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/60 p-5">
            <span className="text-sm text-black/45">Rejected</span>

            <p className="mt-2 font-display text-4xl font-bold">
              {rejectedComments.length}
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* PENDING COMMENTS */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
              <Clock size={18} />
            </div>

            <div>
              <span className="section-label">Needs review</span>

              <h2 className="font-display text-3xl font-bold">
                Pending comments
              </h2>
            </div>
          </div>

          {pendingComments.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-black/10 bg-white/60 p-8">
              <MessageCircle size={22} />

              <h3 className="mt-4 font-display text-xl font-bold">
                All caught up.
              </h3>

              <p className="mt-2 text-sm text-black/50">
                There are no comments waiting for review.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {pendingComments.map((comment) => (
                <article
                  key={comment._id}
                  className="rounded-3xl border border-black/10 bg-white/60 p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold">{comment.userName}</h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            comment.contentType === "product"
                              ? "bg-terracotta/10 text-terracotta"
                              : "bg-black/5 text-black/50"
                          }`}
                        >
                          {comment.contentType === "product"
                            ? "Product"
                            : "Lesson"}
                        </span>

                        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/50">
                          {comment.articleSlug}
                        </span>
                      </div>

                      <p className="mt-4 whitespace-pre-wrap leading-7 text-black/65">
                        {comment.content}
                      </p>

                      <p className="mt-4 text-xs text-black/40">
                        Submitted{" "}
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={
                          updatingId === comment._id ||
                          deletingId === comment._id
                        }
                        onClick={() =>
                          updateCommentStatus(comment._id, "approved")
                        }
                        className="
                          inline-flex items-center gap-2 rounded-full
                          bg-ink px-4 py-2.5 text-sm font-bold text-white
                          transition-all hover:-translate-y-0.5 hover:shadow-md
                          disabled:cursor-not-allowed disabled:opacity-50
                        "
                      >
                        <Check size={16} />
                        {updatingId === comment._id ? "Updating..." : "Approve"}
                      </button>

                      <button
                        type="button"
                        disabled={
                          updatingId === comment._id ||
                          deletingId === comment._id
                        }
                        onClick={() =>
                          updateCommentStatus(comment._id, "rejected")
                        }
                        className="
                          inline-flex items-center gap-2 rounded-full
                          border border-black/10 bg-white px-4 py-2.5
                          text-sm font-bold text-black/60
                          transition-all hover:bg-black/5
                          disabled:cursor-not-allowed disabled:opacity-50
                        "
                      >
                        <X size={16} />
                        Reject
                      </button>

                      <button
                        type="button"
                        disabled={
                          updatingId === comment._id ||
                          deletingId === comment._id
                        }
                        onClick={() => deleteComment(comment._id)}
                        className="
                          inline-flex items-center gap-2 rounded-full
                          border border-red-500/20 bg-red-500/5
                          px-4 py-2.5 text-sm font-bold text-red-700
                          transition-all hover:bg-red-500/10
                          disabled:cursor-not-allowed disabled:opacity-50
                        "
                      >
                        <Trash2 size={16} />
                        {deletingId === comment._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* APPROVED COMMENTS */}
        {approvedComments.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                <Check size={18} />
              </div>

              <div>
                <span className="section-label">Published</span>

                <h2 className="font-display text-3xl font-bold">
                  Approved comments
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {approvedComments.map((comment) => (
                <article
                  key={comment._id}
                  className="rounded-3xl border border-black/10 bg-white/60 p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold">{comment.userName}</h3>

                        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/50">
                          {comment.articleSlug}
                        </span>
                      </div>

                      <p className="mt-4 whitespace-pre-wrap leading-7 text-black/65">
                        {comment.content}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={deletingId === comment._id}
                      onClick={() => deleteComment(comment._id)}
                      className="
                        inline-flex shrink-0 items-center gap-2 rounded-full
                        border border-red-500/20 bg-red-500/5
                        px-4 py-2.5 text-sm font-bold text-red-700
                        transition-all hover:bg-red-500/10
                        disabled:cursor-not-allowed disabled:opacity-50
                      "
                    >
                      <Trash2 size={16} />
                      {deletingId === comment._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* REJECTED COMMENTS */}
        {rejectedComments.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
                <X size={18} />
              </div>

              <div>
                <span className="section-label">Not published</span>

                <h2 className="font-display text-3xl font-bold">
                  Rejected comments
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {rejectedComments.map((comment) => (
                <article
                  key={comment._id}
                  className="rounded-3xl border border-black/10 bg-white/60 p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold">{comment.userName}</h3>

                        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/50">
                          {comment.articleSlug}
                        </span>
                      </div>

                      <p className="mt-4 whitespace-pre-wrap leading-7 text-black/65">
                        {comment.content}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={deletingId === comment._id}
                      onClick={() => deleteComment(comment._id)}
                      className="
                        inline-flex shrink-0 items-center gap-2 rounded-full
                        border border-red-500/20 bg-red-500/5
                        px-4 py-2.5 text-sm font-bold text-red-700
                        transition-all hover:bg-red-500/10
                        disabled:cursor-not-allowed disabled:opacity-50
                      "
                    >
                      <Trash2 size={16} />
                      {deletingId === comment._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
