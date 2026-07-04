import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://www.citytraveldreamer.com/",
    title: "都市遊魂",
    description: "躲在相機背後的安靜觀察者，用鏡頭記錄不擁擠的都會質感、品味角落與慢活旅居足跡。",
    author: "都市遊魂",
    profile: "https://www.citytraveldreamer.com/",
    ogImage: "default-og.jpg",
    lang: "zh-TW",
    timezone: "Asia/Hong_Kong",
    dir: "ltr",
  },
  posts: {
    perPage: 6, // 稍微拉高每頁文章數量，讓排版更豐富
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false, // 關閉英文的動態 OG 圖片生成，避免中文標題產生亂碼
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false, // 關閉 GitHub 編輯按鈕，保持網站乾淨
      url: "https://github.com/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "mail", url: "mailto:yourmail@gmail.com" }, // 之後可以改成你的聯絡信箱
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
