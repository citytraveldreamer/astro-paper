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
        "# Affiliate Short Links (集中管理區)",
        "/go/peak-tram-gyg  https://www.getyourguide.com/hong-kong-l174/hongkongpeak-tram-sky-terrace-428-t1340994/?partner_id=13UDXJC&utm_medium=online_publisher&cmp=blog-the-peak-en  302",
	"# --- Amazon (攝影器材) ---",
        "# 1. 英文 Blog 專用 (綁定 blog tracking ID)",
        "/go/peak-design-clip  https://www.amazon.com/Peak-Design-Capture-Camera-Black/dp/B07818LB9D?th=1&linkCode=ll2&tag=blog-en-20&linkId=ec6bfe2896fe60d96c52633a2bc58ea8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl  302",
        
        "# 2. YouTube 專用 (綁定 youtube tracking ID)",
        "/yt/peak-design-clip  https://www.amazon.com/Peak-Design-Capture-Camera-Black/dp/B07818LB9D?th=1&linkCode=ll2&tag=ctd-yt-20&linkId=3c8689e4d6b934801e19a9f0028d1555&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl  302",
      ];
        
        // 未來有新的短網址，直接在下面加一行即可：
        // "/go/airalo-hk  https://...  302",
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
    cloudflareRedirects(), // 👈 載入自動生成器
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
      smartypants: false, // 👈 移入 processor 解決 Deprecation 警告
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