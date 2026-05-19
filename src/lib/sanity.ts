import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Sanity CMS client.
 *
 * Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET in your environment
 * (or replace the fallback "" below). Get the project ID from sanity.io/manage.
 *
 * Don't forget to add this app's URL as a CORS origin in your Sanity project:
 *   sanity.io/manage → API → CORS origins
 *   For dev: https://*.lovableproject.com (wildcard)
 */
const projectId =
  (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined) ?? "";
const dataset =
  (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";

export const sanityEnabled = projectId.length > 0;

export const sanityClient: SanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* ---------- Types ---------- */

export interface SanityCaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  industry?: string;
  problem?: string;
  solution?: string;
  timeline?: string;
  results?: string[];
  stack?: string[];
  publishedAt?: string;
  coverImage?: SanityImageSource;
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  tag?: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImageSource;
}

/* ---------- Queries ---------- */

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, tag, excerpt, publishedAt, coverImage
}`;

export const CASE_STUDIES_QUERY = `*[_type == "caseStudy"] | order(publishedAt desc) {
  _id, title, slug, industry, problem, solution, timeline, results, stack, publishedAt, coverImage
}`;
