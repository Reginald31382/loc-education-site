"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useSession } from "next-auth/react";

type CommentSectionProps = {
  articleSlug: string;
  contentType?: "lesson" | "product";
};

export default function CommentSection({
  articleSlug,
  contentType = "lesson",
}: CommentSectionProps) {
  const { data: session } = useSession();

  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = userName.trim();
    const trimmedContent = content.trim();

    if (!trimmedName) {
      setMessage("Please enter your name.");
      return;
    }

    if (!trimmedContent) {
      setMessage("Please write a comment before submitting.");
      return;
    }

    if (trimmedName.length > 100) {
      setMessage("Your name cannot exceed 100 characters.");
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
          contentType,
          userName: trimmedName,
          content: trimmedContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit comment.");
      }

      setUserName("");
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
        Share your thoughts and experiences with the LOCED community. You do not
        need an account to comment. Comments are reviewed before becoming
        publicly visible.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="Your name"
          maxLength={100}
          required
          className="
            w-full rounded-2xl
            border border-black/10 bg-white/70
            px-5 py-4 text-sm
            outline-none transition-all
            placeholder:text-black/35
            focus:border-terracotta/50
            focus:ring-4 focus:ring-terracotta/10
          "
        />

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Share your thoughts..."
          maxLength={2000}
          rows={5}
          required
          className="
            mt-4 w-full resize-none rounded-3xl
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
            disabled={submitting || !userName.trim() || !content.trim()}
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
