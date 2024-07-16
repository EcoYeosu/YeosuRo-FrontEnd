import { Metadata } from "next";
import "@styles/globals.css";
import { Providers } from "@app/provider";
import { siteConfig } from "@constant/config";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

// TODO: 운영 전 메타데이터 수정 필요
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // generate own favicon from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="light">
      <body>
        <ReactQueryProvider>
          <Providers>
            <Toaster
              position={"top-center"}
              toastOptions={{
                className: "",
                duration: 1500,
                style: {
                  background: "#434656",
                  color: "#fff",
                  padding: "0.875rem 1.25rem",
                  borderRadius: "1rem",
                },
              }}
            />
            <main className="w-[100dVw] h-[100dVh] flex flex-col">
              {children}
            </main>
          </Providers>
        </ReactQueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
