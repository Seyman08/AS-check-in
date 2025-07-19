import type { Metadata } from "next";
import "./globals.css";
import fonts from "./fonts/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { siteConfig } from "./config/siteConfig";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: siteConfig.seo.icons,
  manifest: siteConfig.seo.manifest,
  // themeColor: [
  //   {
  //     media: "(prefers-color-scheme: light)",
  //     color: siteConfig.seo.themeColor.light,
  //   },
  //   {
  //     media: "(prefers-color-scheme: dark)",
  //     color: siteConfig.seo.themeColor.dark,
  //   },
  // ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.seo.openGraph.width,
        height: siteConfig.seo.openGraph.height,
        alt: siteConfig.title,
      },
    ],
    type: (siteConfig.seo.openGraph.type ?? "website") as
      | "website"
      | "article"
      | "book"
      | "profile"
      | "music.song"
      | "music.album"
      | "music.playlist"
      | "music.radio_station"
      | "video.movie"
      | "video.episode"
      | "video.tv_show"
      | "video.other",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.seo.openGraph.creator,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={`${fonts.bricolageGrotesque.className} antialiased`}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
