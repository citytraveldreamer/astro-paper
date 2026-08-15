import config from "@/config";

function getIdSlug(id: string): string {
  const postId = id.split("/");
  return postId.length > 0 ? String(postId[postId.length - 1]) : id;
}

/**
 * Returns the slug-only path for use as a route param in `getStaticPaths`.
 */
export function getPostSlug(id: string, filePath: string | undefined): string {
  return getIdSlug(id).replace(/\.mdx?$/, "");
}

/**
 * Returns a fully navigable URL for use in `<a href>` and RSS links.
 */
export function getPostUrl(
  id: string,
  filePath: string | undefined,
  locale: string | undefined = config.site.lang
): string {
  const slug = getPostSlug(id, filePath);

  if (id.startsWith("en/") || locale === "en") {
    return `/en/posts/${slug}/`;
  }

  return `/posts/${slug}/`;
}