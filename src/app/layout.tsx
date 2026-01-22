import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tousif Qasim | WordPress, Shopify & WHMCS Developer",
  description: "I’m Tousif Qasim, Professional WordPress, Shopify & WHMCS developer with 7+ years' experience, delivering custom websites, eCommerce stores, and automated solutions.",
  
  authors: [
    { name: 'Tousif Qasim', url: 'https://tousifqasim.dev/' }
  ],

  openGraph: {
    title: "Tousif Qasim | WordPress, Shopify & WHMCS Developer",
    description: "I’m Tousif Qasim, Professional WordPress, Shopify & WHMCS developer with 7+ years' experience, delivering custom websites, eCommerce stores, and automated solutions.",
    url: "https://tousifqasim.dev/",
    siteName: "Tousif Qasim",
    images: [
      {
        url: "https://i.postimg.cc/9Qj2mDzg/Tousif-Qasim.png",
        width: 1200,
        height: 630,
        alt: "Tousif Qasim – WordPress, Shopify & WHMCS Developer"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Tousif Qasim | WordPress, Shopify & WHMCS Developer",
    description: "I’m Tousif Qasim, Professional WordPress, Shopify & WHMCS developer with 7+ years' experience, delivering custom websites, eCommerce stores, and automated solutions.",
    images: ["https://i.postimg.cc/9Qj2mDzg/Tousif-Qasim.png"],
    creator: "@tousifqasim"
  }
} as const;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="6fc49cd7-a913-4ebe-b2d7-68dbf65f40f2"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
