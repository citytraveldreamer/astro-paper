import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";

// 💡 自動為 Cloudflare Pages 生成 _redirects 檔（零延遲原生轉跳）
const cloudflareRedirects = () => ({
  name: "cloudflare-redirects",
  hooks: {
    "astro:build:done": async ({ dir }: { dir: URL }) => {
      const rules = [
        "# ==========================================",
        "# 🔗 Affiliate Short Links (集中管理區)",
        "# ==========================================",
        "# --- GetYourGuide ---",
        "/go/peak-tram-gyg  https://www.getyourguide.com/hong-kong-l174/hongkongpeak-tram-sky-terrace-428-t1340994/?partner_id=13UDXJC&utm_medium=online_publisher&cmp=blog-the-peak-en  302",
        "# --- Amazon Peak Design Clip (Blog) ---",
        "/go/peak-design-clip  https://www.amazon.com/Peak-Design-Capture-Camera-Black/dp/B07818LB9D?th=1&gaOptInStatus=true&linkCode=ll2&tag=blog-en-20&linkId=cd724f99d050832ec957b102161276a4&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl  302",
        "# --- Amazon Peak Design Clip (YouTube) ---",
        "/yt/peak-design-clip  https://www.amazon.com/Peak-Design-Capture-Camera-Black/dp/B07818LB9D?th=1&gaOptInStatus=true&linkCode=ll2&tag=ctd-yt-20&linkId=c7090fce825330234c2060eec48a524e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl  302",
      ];
      const dest = path.join(fileURLToPath(dir), "_redirects");
      await fs.promises.writeFile(dest, rules.join("\n") + "\n");
    },
  },
});

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
    cloudflareRedirects(),
  ],
  i18n: {
    locales: ["zh-HK", "en"],
    defaultLocale: "zh-HK",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      smartypants: false,
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeCallouts],
    }),
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});