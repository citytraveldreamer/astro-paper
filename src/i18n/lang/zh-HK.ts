import type { UIStrings } from "../types";

export default {
  nav: {
    home: "首頁",
    posts: "文章",
    tags: "標籤",
    about: "關於我",
    archives: "歸檔",
    search: "搜尋",
  },
  post: {
    publishedAt: "發布於",
    updatedAt: "更新於",
    sharePostIntro: "分享這篇文章：",
    sharePostOn: "在 {{platform}} 上分享",
    sharePostViaEmail: "透過 Email 分享",
    tagLabel: "標籤",
    backToTop: "回到頂部",
    goBack: "返回上一頁", // 👈 你想改的 "Go back" 在這裡
    editPage: "編輯頁面",
    previousPost: "上一篇",
    nextPost: "下一篇",
  },
  pagination: {
    prev: "上一頁",
    next: "下一頁",
    page: "頁",
  },
  home: {
    socialLinks: "社交連結",
    featured: "精選文章",
    recentPosts: "最新文章", // 👈 你想改的 "Recent Posts" 在這裡
    allPosts: "查看所有文章",
  },
  footer: {
    copyright: "版權所有",
    allRightsReserved: "保留一切權利。",
  },
  pages: {
    tagTitle: "標籤",
    tagDesc: "擁有此標籤的所有文章",

    tagsTitle: "文章標籤",
    tagsDesc: "這裡整理了網站中使用的所有標籤。",

    postsTitle: "所有文章",
    postsDesc: "這裡記錄了所有的旅行日誌與攝影散文。",

    archivesTitle: "歸檔",
    archivesDesc: "所有文章的歷史存檔。",

    searchTitle: "搜尋",
    searchDesc: "搜尋任何你感興趣的文章...",
  },
  a11y: {
    skipToContent: "跳至主要內容",
    openMenu: "開啟選單",
    closeMenu: "關閉選單",
    toggleTheme: "切換主題",
    searchPlaceholder: "搜尋文章...",
    noResults: "找不到相關結果",
    goToPreviousPage: "前往上一頁",
    goToNextPage: "前往下一頁",
  },
  notFound: {
    title: "404 找不到頁面",
    message: "抱歉，您尋找的頁面不存在",
    goHome: "返回首頁",
  },
} satisfies UIStrings;