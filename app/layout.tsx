import type React from "react"
import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ki-benefits - Aktuelle KI-Entwicklungen und Anwendungen",
  description:
    "Entdecken Sie die neuesten KI-Entwicklungen und Anwendungen im privaten und industriellen Bereich. Professionelle Insights und aktuelle Informationen zu Künstlicher Intelligenz.",
  keywords: "KI, Künstliche Intelligenz, AI, Machine Learning, Digitalisierung, Innovation, Technologie",
  authors: [{ name: "ki-benefits" }],
  creator: "ki-benefits",
  publisher: "ki-benefits",
  robots: "index, follow",
  openGraph: {
    title: "ki-benefits - Aktuelle KI-Entwicklungen und Anwendungen",
    description: "Entdecken Sie die neuesten KI-Entwicklungen und Anwendungen im privaten und industriellen Bereich.",
    type: "website",
    locale: "de_DE",
    siteName: "ki-benefits",
  },
  twitter: {
    card: "summary_large_image",
    title: "ki-benefits - Aktuelle KI-Entwicklungen und Anwendungen",
    description: "Entdecken Sie die neuesten KI-Entwicklungen und Anwendungen im privaten und industriellen Bereich.",
  },
  viewport: "width=device-width, initial-scale=1",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${workSans.variable} ${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
