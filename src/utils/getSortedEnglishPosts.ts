import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";

/**
 * Returns English posts, sorted by “last updated” descending.
 */
export function getSortedEnglishPosts(posts: CollectionEntry<"posts">[]) {
  return posts
    .filter(postFilter)
    .filter(({ id }) => id.startsWith("en/")) 
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
}