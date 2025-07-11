import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const runtime = "edge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aryan Pathak | Freelance Web & Mobile App Developer",
  description: "Professional freelance web and mobile app developer. I help build innovative web and mobile applications tailored to your business needs.",
  authors: [{ name: "Aryan Pathak" }],
  keywords: "freelance developer, web app development, mobile app development, Next.js developer, freelance app developer, custom web apps, mobile apps, cloud apps, responsive web development, hourly rates, SEO optimization",

  // Open Graph Tags (for better social media sharing)
  openGraph: {
    title: "Create Next App | Your Name - Freelance Web & Mobile App Developer",
    description: "I build custom web and mobile applications as a freelance developer. Specialized in modern technologies like React, Next.js, and mobile app development.",
    url: "https://aryanpathak.dev",
    // images: [
    //   {
    //     url: "https://yourwebsite.com/og-image.jpg", // URL of the image to display when shared
    //     width: 1200,
    //     height: 630,
    //     alt: "Web and Mobile App Development"
    //   }
    // ],
  },

  // Twitter Card Tags
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Create Next App | Your Name - Freelance Web & Mobile App Developer",
  //   description: "Freelance developer offering custom web and mobile apps. Get in touch to create innovative, user-friendly applications.",
  //   creator: "@your_twitter_handle", // Your Twitter handle
  // },

  // Additional Meta Tags
  robots: "index, follow", // Direct search engines to index the page and follow the links
  viewport: "width=device-width, initial-scale=1.0", // Ensures the app is responsive
  themeColor: "#000000", // Sets the theme color of the app on mobile devices

  // You can inject structured data using a <script type="application/ld+json"> tag in your layout component if needed.
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
