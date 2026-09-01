"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type CommentSectionProps = {
  articleSlug: string;
  contentType?: "lesson" | "product";
};

export default function CommentSection({
  articleSlug,
  contentType = "lesson",
}: CommentSectionProps) {
  const { data: session, status } = useSession();

  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setMessage("Please write a comment before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleSlug,
          content,
          contentType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit comment.");
      }

      setContent("");
      setMessage(
        "Thanks for contributing! Your comment has been submitted for review.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your comment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12 border-t border-black/10 pt-12">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sand">
          <MessageCircle size={19} />
        </div>

        <div>
          <span className="section-label">Join the discussion</span>

          <h2 className="font-display text-3xl font-bold">
            Share your experience
          </h2>
        </div>
      </div>

      <p className="mt-5 max-w-2xl leading-7 text-black/55">
        Share your thoughts and experiences with the LOCED community. Comments
        are reviewed before becoming publicly visible.
      </p>

      {status === "loading" ? (
        <div className="mt-8 rounded-3xl border border-black/10 bg-white/60 p-6">
          <p className="text-sm text-black/50">Checking your session...</p>
        </div>
      ) : !session?.user ? (
        <div className="mt-8 rounded-3xl border border-black/10 bg-white/60 p-6">
          <p className="text-sm leading-6 text-black/55">
            Sign in to share your experience with the community.
          </p>

          <Link
            href="/login"
            className="
              mt-4 inline-flex items-center justify-center
              rounded-full bg-ink px-5 py-2.5
              text-sm font-bold text-white
              transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-md
            "
          >
            Sign in to comment
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share your thoughts..."
            maxLength={2000}
            rows={5}
            className="
              w-full resize-none rounded-3xl
              border border-black/10 bg-white/70
              px-5 py-4 text-sm leading-7
              outline-none transition-all
              placeholder:text-black/35
              focus:border-terracotta/50
              focus:ring-4 focus:ring-terracotta/10
            "
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-black/35">
              {content.length}/2000 characters
            </span>

            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="
                inline-flex items-center gap-2
                rounded-full bg-ink px-5 py-2.5
                text-sm font-bold text-white
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
              "
            >
              <Send size={16} />

              {submitting ? "Submitting..." : "Submit comment"}
            </button>
          </div>
        </form>
      )}

      {message && (
        <p
          className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
            message.includes("Thanks")
              ? "bg-green-500/10 text-green-700"
              : "bg-red-500/10 text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
