"use client";

import React, { useState } from "react";
import Button from "@/client/Button";
import { postMessage } from "@/lib/server-actions";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    await postMessage({ email, senderId: name, message, type: "support" });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Have questions, feedback, or want to connect with us? We&apos;d love
            to hear from you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Direct Info Sidebar */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:col-span-1">
            <h2 className="text-xl font-bold text-slate-900">Contact Info</h2>
            <p className="mt-2 text-sm text-slate-600">
              Prefer sending an email directly from your client?
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </span>
                <a
                  href="mailto:tailgates4Jesus@gmail.com?subject=Feedback"
                  className="mt-1 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                >
                  tailgates4Jesus@gmail.com
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Response Time
                </span>
                <p className="mt-1 text-sm text-slate-700">
                  We usually respond within 24–48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:col-span-2">
            {submitted ? (
              <div className="py-12 text-center">
                <h3 className="text-2xl font-semibold text-slate-900">
                  Thank You!
                </h3>
                <p className="mt-2 text-slate-600">
                  Your message has been sent. We&apos;ll get back to you
                  shortly.
                </p>
                <Button
                  className="mt-6 border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Your Name"
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="you@example.com"
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  <a
                    href="mailto:tailgates4Jesus@gmail.com?subject=Feedback"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800"
                  >
                    Or open email app
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
