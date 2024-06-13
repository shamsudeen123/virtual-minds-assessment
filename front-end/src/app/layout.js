"use client";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({ children }) {
  const currentURL = typeof window !== "undefined" && window.location.href;

  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;700&display=swap"
        />
      </Head>
      <body>
        <>{children}</>
      </body>
    </html>
  );
}
