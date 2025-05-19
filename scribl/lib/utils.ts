import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function metadata({
  title,
  absolute,
  description = "A free blogging social media, to share stories and follow interesting people.",
}: {
  title?: string;
  absolute?: string;
  description?: string;
} = {}): Metadata {
  const _title = absolute
    ? absolute
    : title
    ? `${title} - Scribl.dev`
    : "Scribl.dev";

  return {
    title: _title,
    description,
    keywords: ["Blog", "Story", "Share", "Social", "Post"],

    openGraph: {
      title,
      description,
      images: [{ url: "/icon.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/icon.png"],
    },

    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}
