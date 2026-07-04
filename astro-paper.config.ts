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
    locales: ["zh-TW", "en"], // 🌟 關鍵：在這裡直接登記許可的語言清單，破解新版 v6 的 MissingLocaleError！
  },
  posts: {
    perPage: 6,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "mail", url: "mailto:yourmail@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
