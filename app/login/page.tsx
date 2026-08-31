"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

function GoogleIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.51h3.14c1.84-1.7 2.91-4.2 2.91-7.28Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.64 0 4.86-.87 6.48-2.36l-3.14-2.51c-.87.58-1.99.92-3.34.92-2.56 0-4.73-1.73-5.5-4.05H3.26v2.59A9.78 9.78 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.5 13.75A5.87 5.87 0 0 1 6.19 12c0-.61.11-1.2.31-1.75V7.66H3.26A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.01 4.34l3.24-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.2c1.44 0 2.73.5 3.75 1.48l2.81-2.81C16.85 3.28 14.63 2.25 12 2.25a9.78 9.78 0 0 0-8.74 5.41l3.24 2.59C7.27 7.93 9.44 6.2 12 6.2Z"
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <main className="container-site flex min-h-[calc(100vh-72px)] items-center justify-center py-16">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-md"
      >
        <div className="rounded-[2rem] border border-black/10 bg-white/70 p-8 shadow-sm backdrop-blur sm:p-10">
          <div className="text-center">
            <span className="pill">LOCED COMMUNITY</span>

            <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.04em]">
              Join the conversation.
            </h1>

            <p className="mt-4 leading-7 text-black/55">
              Sign in to share your experience, ask questions, and participate
              in the LOCED community.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs leading-5 text-black/40">
            Signing in allows you to submit comments to LOCED lessons. Comments
            may be reviewed before becoming publicly visible.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
