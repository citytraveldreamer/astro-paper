import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://new.citytraveldreamer.com/",
    title: "都市遊魂",
    description: "躲在相機背後的安靜觀察者，用鏡頭記錄不擁擠的都會質感、品味角落與慢活旅居足跡。",
    author: "都市遊魂",
    profile: "https://www.citytraveldreamer.com/",
    ogImage: "default-og.jpg",
    lang: "zh-HK",
    timezone: "Asia/Hong_Kong",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "mail", url: "mailto:citytraveldreamer@gmail.com" },
    { name: "facebook", url: "https://www.facebook.com/citytraveldreamer" },
    { name: "Instagram", url: "https://www.instagram.com/citytraveldreamer" },
    { name: "Youtube", url: "https://www.youtube.com/@citytraveldreamer" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
