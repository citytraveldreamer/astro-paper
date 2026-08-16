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

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
  ],
  i18n: {
    locales: ["zh-HK", "en"],
    defaultLocale: "zh-HK",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  
  // 👇 加入 redirects 區塊，集中管理你的 Affiliate 短連結
  redirects: {
    // ==========================================
    // 🔗 Affiliate Short URLs (集中管理區)
    // 命名規則: /go/產品名稱-平台
    // ==========================================

    // --- 香港區文章 ---
    "/go/peak-tram-gyg": "https://www.getyourguide.com/hong-kong-l174/hongkongpeak-tram-sky-terrace-428-t1340994/?partner_id=13UDXJC&utm_medium=online_publisher&cmp=blog-the-peak-en",
    
    // 你可以隨時在這裡繼續往下加，例如：
    // "/go/airalo-hk": "https://...",
  },

  markdown: {
    smartypants: false,
    processor: unified({
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