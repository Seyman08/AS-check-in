export const siteConfig = {
  name: "Apeke Stitches",
  type: "Staff Attendance Tracker",
  title: "Apeke Stitches – Secure Staff Check-In System",
  url: "https://apekestitches-checkin.vercel.app",
  logo: "/logo.png",
  ogImage: "https://apekestitches-checkin.vercel.app/og-image.jpg",
  description:
    "A simple and secure GPS-based check-in system for tailoring staff. Track attendance, get notifications, and export check-in records easily.",

  links: {
    x: "https://x.com/sanmi_hq",
    github: "https://github.com/sanmihq/apeke-checkin",
    linkedin: "https://www.linkedin.com/in/sanmihq",
  },

  seo: {
    icons: {
      icon: "/favicon.ico",
      shortcut: "/android-chrome-192x192.png",
      apple: "/android-chrome-192x192.png",
    },
    manifest: "/manifest.json",
    themeColor: {
      light: "#fff8f1",
      dark: "#1e293b",
    },
    openGraph: {
      type: "website",
      width: 1200,
      height: 630,
      creator: "@sanmi_hq",
    },
  },
};

export type SiteConfig = typeof siteConfig;
