"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MessageCircle, Send } from "lucide-react";

type CommentSectionProps = {
  articleSlug: string;
};

export default function CommentSection({ articleSlug }: CommentSectionProps) {
  const { data: session, status } = useSession();

  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim() || submitting) return;

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleSlug,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong while submitting your comment.",
        );
      }

      setContent("");
      setMessage(
        "Thanks for sharing your thoughts. Your comment was submitted for review.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-20 border-t border-black/10 pt-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
            <MessageCircle size={19} />
          </div>

          <div>
            <span className="section-label">Community</span>

            <h2 className="mt-1 font-display text-3xl font-bold">
              Join the conversation.
            </h2>
          </div>
        </div>

        <p className="mt-5 leading-7 text-black/55">
          Share your experience, perspective, or questions about this lesson.
          Comments are reviewed before becoming publicly visible.
        </p>

        {status === "loading" ? (
          <div className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 text-sm text-black/50">
            Checking your account...
          </div>
        ) : status === "authenticated" ? (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-3xl border border-black/10 bg-white/60 p-5 sm:p-6"
          >
            <label htmlFor="comment" className="text-sm font-semibold">
              Your thoughts
            </label>

            <textarea
              id="comment"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              maxLength={2000}
              rows={6}
              placeholder="Share your experience or perspective..."
              className="
                mt-3 w-full resize-none rounded-2xl
                border border-black/10 bg-white
                px-4 py-3 text-sm leading-6
                outline-none transition-colors
                placeholder:text-black/35
                focus:border-terracotta
              "
            />

            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-xs text-black/40">
                {content.length}/2000 characters
              </span>

              <button
                type="submit"
                disabled={!content.trim() || submitting}
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-ink px-5 py-3 text-sm font-bold text-white
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-md
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:translate-y-0
                "
              >
                <Send size={16} />

                {submitting ? "Submitting..." : "Submit comment"}
              </button>
            </div>

            {message && <p className="mt-4 text-sm text-black/60">{message}</p>}
          </form>
        ) : (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white/60 p-6">
            <h3 className="font-display text-xl font-bold">
              Want to join the conversation?
            </h3>

            <p className="mt-2 text-sm leading-6 text-black/55">
              Sign in with your Google account to submit a comment. Comments are
              reviewed before being published.
            </p>

            <Link
              href="/login"
              className="
                mt-5 inline-flex rounded-full
                bg-ink px-5 py-3 text-sm font-bold text-white
                transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-md
              "
            >
              Sign in to comment
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
